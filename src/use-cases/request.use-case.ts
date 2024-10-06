"use server";
import { getUserSession } from "@/app/lib/session";
import { SERVICE_CATEGORIES } from "@/constants/index.constants";
import { MESSAGES } from "@/constants/message.constants";
import { getDepartmentByParams } from "@/data-access/department.data-access";
import { createRequestProcess } from "@/data-access/request-process.data-acces";
import {
	createRequest,
	getAllRequests,
	getRequestByParams,
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
	TCreateBAGSRequest,
	TCreateMISRequest,
	TCreateRequestParams,
	TGetAllRequestParams,
	TGetAllRequestReturn,
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
				console.log(MIS)
				requestDetails.problemType = MIS.problemType;
				requestDetails.otherProblem = MIS.otherProblem || null;
			}
		}

		const request = await createRequest(requestDetails, session) as any;

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

		return { isRequestCreated: true };
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


export const getAllRequestsUseCase = async (params: TGetAllRequestParams) => {
	const requests =  await getAllRequests({});

	const requestData: TGetAllRequestReturn[] = [];
	for(const request of requests) {
		requestData.push({
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
			avatar: request.user.avatar ? await getFileBuffer("images", request.user.avatar) : null
		})
	}

	return requestData;
}