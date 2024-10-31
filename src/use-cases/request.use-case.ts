"use server";
import { getUserSession } from "@/app/lib/session";
import {
	ACKNOWLEDGE_TYPE,
	DESIGNATIONS,
	REQUEST_PROCESS,
	SERVICE_CATEGORIES,
	SERVICE_TYPES,
} from "@/constants/index.constants";
import { MESSAGES } from "@/constants/message.constants";
import { getDepartmentByParams } from "@/data-access/department.data-access";
import {
	createRequestProcess,
	getRequestProcessByParams,
} from "@/data-access/request-process.data-acces";
import {
	createRequest,
	getAllRequests,
	getRequestByParams,
	getRequestDetailsByDepartment,
	getRequestsByDepartment,
	getRequestsCountByDepartment,
	updateRequestProcess,
} from "@/data-access/request.data-access";
import { getServiceCategoryByParams } from "@/data-access/service-category.data-access";
import {
	getUserByParams,
	getUserDetailsById,
} from "@/data-access/user.data-access";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { generateRandomAlphanumericId } from "@/lib/string.helper";
import {
	defaultRequestProcess,
	RequestProcessType,
} from "@/models/request-process.model";
import { RequestType } from "@/models/request.model";
import {
	TAcknowledgeRequestParams,
	TCreateBAGSRequest,
	TCreateMISRequest,
	TCreateRequestParams,
	TGetAllRequestParams,
	TGetAllRequestReturn,
	TGetRequestsByDepartmentReturn,
} from "@/types/request.types";
import { UploadRequestAttachments } from "@/utils/file-parser";
import mongoose from "mongoose";
import errorMap from "zod/locales/en.js";
import {
	deleteFile,
	formDataObjectToFiles,
	getFileBuffer,
	MultipleFileUpload,
} from "@/lib/file.helper";

export const createRequestUseCase = async (params: TCreateRequestParams) => {
	const { user } = await getUserSession();
	const session = await mongoose.startSession();
	const fileNamePlaceholder: string[] = [];

	try {
		session.startTransaction();
		const checkTitle = await getRequestByParams({
			title: params.requestDetails.title,
		});
		if (checkTitle) throw new CustomThrowError(MESSAGES.REQUEST_TITLE_EXIST);

		const userDetails = await getUserDetailsById({ id: user.id });

		if (!userDetails) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);
		const data = params.requestDetails;

		const serviceCategory = await getServiceCategoryByParams({
			_id: data.serviceCategory,
		});
		if (!serviceCategory)
			throw new CustomThrowError(MESSAGES.SERVICE_CATEGORY_NOT_EXIST);

		const requestUniqueId = generateRandomAlphanumericId(8);

		const requestDetails = {
			title: data.title,
			serviceCategory: new mongoose.Types.ObjectId(serviceCategory._id),
			requestUniqueId: requestUniqueId.toUpperCase(),
			problemDetails: data.problemDetails as any[],
			priorityLevel: data.priorityLevel,
			requestor: new mongoose.Types.ObjectId(userDetails._id),
			department: new mongoose.Types.ObjectId(userDetails.department._id),
			services: null,
			otherService: null,
			otherProblem: null,
			problemType: null,
			attachments: null,
			startDateTime: null,
			endDateTime: null,
		} as RequestType;

		const files = await formDataObjectToFiles(params.files);

		if (files.length) {
			const attachmentsFiles = await MultipleFileUpload(
				files,
				"request_attachments"
			);
			requestDetails.attachments = attachmentsFiles;
			fileNamePlaceholder.push(...attachmentsFiles);
		}
		if (
			serviceCategory.name === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES
		) {
			const BAGS = data as TCreateBAGSRequest;
			if (BAGS.services) {
				requestDetails.services = BAGS.services;
				requestDetails.otherService = BAGS.otherService || null;
			}
		} else if (
			serviceCategory.name === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM
		) {
			const MIS = data as TCreateMISRequest;
			if (MIS.problemType) {
				console.log(MIS);
				requestDetails.problemType = MIS.problemType;
				requestDetails.otherProblem = MIS.otherProblem || null;
			}
		}

		const request = (await createRequest(requestDetails, session)) as any;

		if (!request[0]?._id)
			throw new CustomThrowError(MESSAGES.CREATE_REQUEST_FAILED);

		const requestProcessData = {
			request: request[0]?._id.toString(),
			...defaultRequestProcess,
		} as RequestProcessType;

		const requestProcess = await createRequestProcess(
			requestProcessData,
			session
		);

		await session.commitTransaction();

		return {
			isRequestCreated: true,
			requestId: request[0]?._id.toString(),
			requestedBy: userDetails.fullName,
		};
	} catch (error: any) {
		await session.abortTransaction();
		for (const file of fileNamePlaceholder) {
			await deleteFile("request_attachments", file);
		}
		throw new CustomThrowError(error.message);
	} finally {
		await session.endSession(); // End the session
	}
};

export const getRequestByDepartmentUseCase = async (params: {
	requestId: string;
}) => {
	const { user } = await getUserSession();

	if (!user) throw new CustomThrowError("User does not exists");

	const request = await getRequestDetailsByDepartment({
		requestId: params.requestId,
		department: user.department,
	});

	if (!request) throw new CustomThrowError("Request does not exists");

	const nextProcess: Record<string, any> = {};
	console.log(request);
	return {
		_id: request._id,
		title: request.title,
		userId: request.user._id,
		problemType: request.problemType,
		services: request.services,
		otherProblem: request.otherProblem,
		otherService: request.otherService,
		startDate: request.startDate,
		endDate: request.endDate,
		requestorName: request.user.fullName,
		department: request.user.department.name,
		requestUniqueId: request.requestUniqueId,
		serviceCategory: request.serviceCategory.name,
		problemDetails: request.problemDetails,
		requestProcess: request.requestProcess,
		createdAt: request.createdAt,
		priorityLevel: request.priorityLevel,
		avatar: request.user.avatar
			? await getFileBuffer("images", request.user.avatar)
			: null,
	};
};

export const getRequestsByDepartmentUseCase = async () => {
	const { user } = await getUserSession();

	if (!user) throw new CustomThrowError("User does not exists");

	const totalRequests = await getRequestsCountByDepartment(user.department);
	const requests = await getRequestsByDepartment(user.department);
	const requestsByDepartment: TGetRequestsByDepartmentReturn["requests"] = [];

	for (const request of requests) {
		requestsByDepartment.push({
			_id: request._id as string,
			title: request.title,
			userId: request.user._id,
			requestorName: request.user.fullName,
			department: request.user.department.initials,
			requestUniqueId: request.requestUniqueId,
			serviceCategory: request.serviceCategory.name,
			createdAt: request.createdAt,
			avatar: request.user.avatar
				? await getFileBuffer("images", request.user.avatar)
				: null,
			priorityLevel: request.priorityLevel,
		});
	}

	return {
		requests: requestsByDepartment,
		totalRequests: totalRequests[0]?.totalRequests || 0,
	};
};

const getServiceTypeByUserDepartment = async (params: {
	department: string;
	currentServiceType: string;
	userDesignation: string;
}) => {
	let serviceType = params.currentServiceType;
	let isServiceType = false;

	if (params.userDesignation === DESIGNATIONS.SERVICE_APPROVER) {
		const department = await getDepartmentByParams({ _id: params.department });
		if (department?.name === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM) {
			const mis = await getServiceCategoryByParams({
				name: SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM,
			});
			if (mis?.name) {
				serviceType = mis?._id;
				isServiceType = true;
			}
		} else if (
			department?.name === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES
		) {
			const bags = await getServiceCategoryByParams({
				name: SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES,
			});
			if (bags?.name) {
				serviceType = bags?._id;
				isServiceType = true;
			}
		}
	}

	return { serviceType, isServiceType };
};

export const getAllRequestsUseCase = async (params: TGetAllRequestParams) => {
	const { user } = await getUserSession();

	if (!user) throw new CustomThrowError("User does not exists");

	const { serviceType, isServiceType } = await getServiceTypeByUserDepartment({
		department: user?.department,
		currentServiceType: params.serviceType,
		userDesignation: user?.designation,
	});

	params.serviceType = serviceType;

	if (!isServiceType) {
		params.department = user?.department;
	}

	const requests = await getAllRequests(params);

	const requestData: TGetAllRequestReturn[] = [];
	for (const request of requests) {
		requestData.push({
			_id: request._id,
			departmentId: request.departmentId,
			title: request.title,
			userId: request.user._id,
			problemType: request.problemType,
			services: request.services,
			otherProblem: request.otherProblem,
			otherService: request.otherService,
			startDate: request.startDate,
			endDate: request.endDate,
			requestorName: request.user.fullName,
			department: request.user.department.name,
			requestUniqueId: request.requestUniqueId,
			serviceCategory: request.serviceCategory.name,
			problemDetails: request.problemDetails,
			requestProcess: request.requestProcess,
			createdAt: request.createdAt,
			priorityLevel: request.priorityLevel,
			avatar: request.user.avatar
				? await getFileBuffer("images", request.user.avatar)
				: null,
		});
	}

	return requestData;
};

export const acknowledgeRequestUseCase = async (
	params: TAcknowledgeRequestParams
) => {
	const { user } = await getUserSession();

	if (!user) throw new CustomThrowError("User does not exists.");

	// if (user.designation !== DESIGNATIONS.UNIT_HEAD)
	// 	throw new CustomThrowError("Only Unit Head can approve this request.");

	const request = await getRequestByParams({ _id: params.requestId });
	if (!request) throw new CustomThrowError("Request does not exists.");

	const requestProcess = await getRequestProcessByParams({
		request: params.requestId,
	});

	if (!requestProcess)
		throw new CustomThrowError("Request process does not exists.");

	// if (request.department.toString() !== user.department.toString())
	// 	throw new CustomThrowError(
	// 		"Failed to approve request. Please refresh the page."
	// 	);

	if (!request.isActive)
		throw new CustomThrowError(
			"Request is not active. Please refresh the page."
		);

	let process = {} as any;

	if (params.acknowledgeType === ACKNOWLEDGE_TYPE.APPROVED) {
		if (
			params.processType === REQUEST_PROCESS.UNIT_APPROVAL &&
			user.designation === DESIGNATIONS.UNIT_HEAD &&
			request.department.toString() === user.department.toString()
		) {
			process = {
				unitApproval: {
					acknowledgeBy: user.id,
					approvedAt: new Date(),
					isRejected: null,
				},
			};
		} else if (
			params.processType === REQUEST_PROCESS.RECOMMENDING_APPROVAL &&
			requestProcess.unitApproval.approvedAt &&
			params.serviceCategory === SERVICE_TYPES.BAGS &&
			user.designation === DESIGNATIONS.RECOMMENDING_APPROVER
		) {
			process = {
				recommendingApproval: {
					acknowledgeBy: user.id,
					approvedAt: new Date(),
					isRejected: null,
				},
			};
		} else if (
			params.processType === REQUEST_PROCESS.SERVICE_APPROVAL &&
			requestProcess.recommendingApproval.approvedAt &&
			params.serviceCategory === SERVICE_TYPES.BAGS &&
			user.designation === DESIGNATIONS.SERVICE_APPROVER
		) {
			process = {
				serviceUnitApproval: {
					acknowledgeBy: user.id,
					approvedAt: new Date(),
					isRejected: null,
					serviceUnit: params.serviceUnit,
				},
			};
		} else if (
			params.processType === REQUEST_PROCESS.SERVICE_APPROVAL &&
			requestProcess.unitApproval.approvedAt &&
			params.serviceCategory === SERVICE_TYPES.MIS &&
			user.designation === DESIGNATIONS.SERVICE_APPROVER
		) {
			process = {
				serviceUnitApproval: {
					acknowledgeBy: user.id,
					approvedAt: new Date(),
					isRejected: null,
					serviceUnit: request.serviceCategory,
				},
			};
		} else {
			throw new CustomThrowError("Previous process is required.");
		}
	} else if (params.acknowledgeType === ACKNOWLEDGE_TYPE.REJECTED) {
		if (params.processType === REQUEST_PROCESS.UNIT_APPROVAL) {
			process = {
				unitApproval: {
					acknowledgeBy: user.id,
					isRejected: true,
					rejectedAt: new Date(),
					rejectReason: params.rejectReason,
				},
			};
		} else if (params.processType === REQUEST_PROCESS.SERVICE_APPROVAL) {
			process = {
				serviceUnitApproval: {
					acknowledgeBy: user.id,
					isRejected: true,
					rejectedAt: new Date(),
					rejectReason: params.rejectReason,
					serviceUnit: params.serviceUnit,
				},
			};
		}
	}

	const approvedRequest = await updateRequestProcess({
		request: params.requestId,
		data: {
			...process,
		},
	});

	if (approvedRequest?.modifiedCount) {
		return { isAcknowledged: true };
	}

	return { isAcknowledged: false };
};
