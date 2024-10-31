import { REQUEST_PROCESS } from "@/constants/index.constants";
import { MODEL_NAMES } from "@/constants/model.constants";
import { pluralize } from "@/lib/string.helper";
import RequestProcess from "@/models/request-process.model";
import Request, { RequestType } from "@/models/request.model";
import { TRequestProcess } from "@/types/request.types";
import mongoose, { ClientSession, FilterQuery } from "mongoose";

export const getRequestByParams = async (
	params: FilterQuery<RequestType>
): Promise<RequestType | null> => {
	return await Request.findOne(params).lean();
};

const requestProcessQueries = [
	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.unitApproval.acknowledgeBy",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.unitApproval.acknowledgeDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.unitApproval.acknowledgeDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},

	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.recommendingApproval.acknowledgeBy",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.recommendingApproval.acknowledgeDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.recommendingApproval.acknowledgeDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},

	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.serviceUnitApproval.acknowledgeBy",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.serviceUnitApproval.acknowledgeDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.serviceUnitApproval.acknowledgeDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},

	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.confirmation.confirmedBy",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.confirmation.confirmationDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.confirmation.confirmationDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},

	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.assignedPerson.assignedTo",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.assignedPerson.assignedToDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.assignedPerson.assignedToDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},

	{
		$lookup: {
			from: pluralize(MODEL_NAMES.USER),
			localField: "requestProcess.assignedPerson.assignedBy",
			foreignField: "_id",
			pipeline: [
				{
					$project: {
						_id: 0,
						fullName: 1,
					},
				},
			],
			as: `requestProcess.assignedPerson.assignedByDetails`,
		},
	},
	{
		$unwind: {
			path: `$requestProcess.assignedPerson.assignedByDetails`,
			preserveNullAndEmptyArrays: true,
		}, // Flatten the designation array for each user
	},
];

export const createRequest = async (
	params: RequestType,
	session?: ClientSession
) => {
	if (session) {
		return await Request.create([{ ...params }], { session: session });
	}
	return await Request.create(params);
};

export const getRequestsCountByDepartment = async (department: string) => {
	return await Request.aggregate([
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.USER),
				localField: "requestor",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$match: {
				isActive: true,
				[`${MODEL_NAMES.USER}.department`]: new mongoose.Types.ObjectId(
					department
				),
			},
		},
		{
			$count: "totalRequests", // Count the resulting documents
		},
	]).exec();
};

export const getRequestsByDepartment = async (department: string) => {
	return await Request.aggregate([
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.SERVICE_CATEGORY),
				localField: "serviceCategory",
				foreignField: "_id",
				as: MODEL_NAMES.SERVICE_CATEGORY,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.SERVICE_CATEGORY}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.REQUEST_PROCESS),
				localField: "_id",
				foreignField: "request",
				as: MODEL_NAMES.REQUEST_PROCESS,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.REQUEST_PROCESS}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.USER),
				localField: "requestor",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		...requestProcessQueries,
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.DEPARTMENT),
				localField: "user.department",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$match: {
				isActive: true,
				[`${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}._id`]:
					new mongoose.Types.ObjectId(department),
			},
		},
		{
			$sort: { createdAt: -1 },
		},
		{
			$skip: 0, // Skip documents for pagination
		},
		{
			$limit: 5, // Limit the number of documents
		},
	]).exec();
};

export const getAllRequests = async (params?: any) => {
	// params.page = 1;
	// params.limit = 10;
	// const skip = (page - 1) * limit;
	let pipelines: Record<string, any> = {};

	if (params?.serviceType) {
		pipelines[`${MODEL_NAMES.SERVICE_CATEGORY}._id`] =
			new mongoose.Types.ObjectId(params?.serviceType);
	}

	if(params?.department) {
		pipelines[MODEL_NAMES.DEPARTMENT] =
			new mongoose.Types.ObjectId(params?.department);
	} 

	if (params?.keywords) {
		pipelines["$or"] = [
			{ title: { $regex: params.keywords.trim(), $options: "i" } },
			{ problemDetails: { $regex: params.keywords.trim(), $options: "i" } },
		];
	}

	if (params?.requestProcess) {
		if (params?.requestProcess === REQUEST_PROCESS.REQUEST_DETAILS) {
			pipelines[`${MODEL_NAMES.REQUEST_PROCESS}.filingUp.isCompleted`] = {
				$ne: null,
			};
		} else if (params?.requestProcess === REQUEST_PROCESS.UNIT_APPROVAL) {
			pipelines[`${MODEL_NAMES.REQUEST_PROCESS}.unitApproval.acknowledgeBy`] = {
				$ne: null,
			};
		} else if (
			params?.requestProcess === REQUEST_PROCESS.RECOMMENDING_APPROVAL
		) {
			pipelines[
				`${MODEL_NAMES.REQUEST_PROCESS}.recommendingApproval.acknowledgeBy`
			] = { $ne: null };
		} else if (params?.requestProcess === REQUEST_PROCESS.SERVICE_APPROVAL) {
			pipelines[
				`${MODEL_NAMES.REQUEST_PROCESS}.serviceUnitApproval.acknowledgeBy`
			] = { $ne: null };
		} else if (params?.requestProcess === REQUEST_PROCESS.ASSIGNED_APPROVAL) {
			pipelines[`${MODEL_NAMES.REQUEST_PROCESS}.assignedPerson.assignedBy`] = {
				$ne: null,
			};
		}
	}

	if (params?.from && params?.to) {
		pipelines["createdAt"] = {
			$gte: new Date(params?.from),
			$lte: new Date(params?.to),
		};
	}

	if (params?.priorityLevel) {
		pipelines["priorityLevel"] = params?.priorityLevel;
	}

	return await Request.aggregate([
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.SERVICE_CATEGORY),
				localField: "serviceCategory",
				foreignField: "_id",
				as: MODEL_NAMES.SERVICE_CATEGORY,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.SERVICE_CATEGORY}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.REQUEST_PROCESS),
				localField: "_id",
				foreignField: "request",
				as: MODEL_NAMES.REQUEST_PROCESS,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.REQUEST_PROCESS}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.USER),
				localField: "requestor",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		...requestProcessQueries,
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.DEPARTMENT),
				localField: "user.department",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.POSITION),
				localField: "user.position",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$match: { isActive: true, ...pipelines },
		},
		{
			$sort: { createdAt: -1 },
		},
		{
			$addFields: {
				"departmentId": "$department",
				// Replace the acknowledgeBy field with the fullName
				"requestProcess.unitApproval.acknowledgeBy.fullName":
					"$requestProcess.unitApproval.acknowledgeDetails.fullName",
				"requestProcess.recommendingApproval.acknowledgeBy.fullName":
					"$requestProcess.recommendingApproval.acknowledgeDetails.fullName",
				"requestProcess.serviceUnitApproval.acknowledgeBy.fullName":
					"$requestProcess.serviceUnitApproval.acknowledgeDetails.fullName",
				"requestProcess.confirmation.confirmedBy.fullName":
					"$requestProcess.confirmation.confirmationDetails.fullName",
				"requestProcess.assignedPerson.assignedTo.fullName":
					"$requestProcess.assignedPerson.assignedToDetails.fullName",
				"requestProcess.assignedPerson.assignedBy.fullName":
					"$requestProcess.assignedPerson.assignedByDetails.fullName",
			},
		},
		{
			$project: {
				"requestProcess.unitApproval.acknowledgeDetails": 0,
				"requestProcess.recommendingApproval.acknowledgeBy.fullName": 0,
				"requestProcess.serviceUnitApproval.acknowledgeBy.fullName": 0,
				"requestProcess.confirmation.confirmedBy.fullName": 0,
				"requestProcess.assignedPerson.assignedTo.fullName": 0,
				"requestProcess.assignedPerson.assignedBy.fullName": 0,
			},
		},
		{
			$skip: 0, // Skip documents for pagination
		},
		{
			$limit: 9, // Limit the number of documents
		},
	]).exec();
};



export const getRequestDetailsByDepartment = async (params: {
	requestId: string;
	department: string;
}) => {
	const request = await Request.aggregate([
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.SERVICE_CATEGORY),
				localField: "serviceCategory",
				foreignField: "_id",
				as: MODEL_NAMES.SERVICE_CATEGORY,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.SERVICE_CATEGORY}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.REQUEST_PROCESS),
				localField: "_id",
				foreignField: "request",
				as: MODEL_NAMES.REQUEST_PROCESS,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.REQUEST_PROCESS}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.USER),
				localField: "requestor",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		...requestProcessQueries,
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.DEPARTMENT),
				localField: "user.department",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$lookup: {
				from: pluralize(MODEL_NAMES.POSITION),
				localField: "user.position",
				foreignField: "_id",
				as: `${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`,
			},
		},
		{
			$unwind: {
				path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`,
				preserveNullAndEmptyArrays: true,
			}, // Flatten the designation array for each user
		},
		{
			$match: {
				isActive: true,
				_id: new mongoose.Types.ObjectId(params.requestId),
				department: new mongoose.Types.ObjectId(params.department),
			},
		},
		{
			$sort: { createdAt: -1 },
		},
		{
			$addFields: {
				// Replace the acknowledgeBy field with the fullName
				"requestProcess.unitApproval.acknowledgeBy.fullName":
					"$requestProcess.unitApproval.acknowledgeDetails.fullName",
				"requestProcess.recommendingApproval.acknowledgeBy.fullName":
					"$requestProcess.recommendingApproval.acknowledgeDetails.fullName",
				"requestProcess.serviceUnitApproval.acknowledgeBy.fullName":
					"$requestProcess.serviceUnitApproval.acknowledgeDetails.fullName",
				"requestProcess.confirmation.confirmedBy.fullName":
					"$requestProcess.confirmation.confirmationDetails.fullName",
				"requestProcess.assignedPerson.assignedTo.fullName":
					"$requestProcess.assignedPerson.assignedToDetails.fullName",
				"requestProcess.assignedPerson.assignedBy.fullName":
					"$requestProcess.assignedPerson.assignedByDetails.fullName",
			},
		},
		{
			$project: {
				"requestProcess.unitApproval.acknowledgeDetails": 0,
				"requestProcess.recommendingApproval.acknowledgeBy.fullName": 0,
				"requestProcess.serviceUnitApproval.acknowledgeBy.fullName": 0,
				"requestProcess.confirmation.confirmedBy.fullName": 0,
				"requestProcess.assignedPerson.assignedTo.fullName": 0,
				"requestProcess.assignedPerson.assignedBy.fullName": 0,
			},
		},
	]).exec();

	return request[0] || null;
};

export const updateRequestProcess = async (params: {
	request: string;
	data: Partial<TRequestProcess>;
}) => {
	return await RequestProcess.updateOne(
		{ request: params.request },
		{
			$set: { ...params.data },
		}
	);
};
