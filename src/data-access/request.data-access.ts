import { MODEL_NAMES } from "@/constants/model.constants";
import { pluralize } from "@/lib/string.helper";
import Request, { RequestType } from "@/models/request.model";
import { ClientSession, FilterQuery } from "mongoose";

export const getRequestByParams = async (
	params: FilterQuery<RequestType>
): Promise<RequestType | null> => {
	return await Request.findOne(params).lean();
};

export const createRequest = async (
	params: RequestType,
	session?: ClientSession
) => {
	if (session) {
		return await Request.create([{ ...params }], { session: session });
	}
	return await Request.create(params);
};

export const getAllRequests = async (params: any) => {
    // params.page = 1;
    // params.limit = 10;
    // const skip = (page - 1) * limit;

	return await Request.aggregate([
        {
            $lookup: {
                from: pluralize(MODEL_NAMES.SERVICE_CATEGORY),
                localField: "serviceCategory",
                foreignField: "_id",
                as: MODEL_NAMES.SERVICE_CATEGORY
            }
        },
        {
            $unwind: { path: `$${MODEL_NAMES.SERVICE_CATEGORY}`, preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
        },
        {
            $lookup: {
                from: pluralize(MODEL_NAMES.REQUEST_PROCESS),
                localField: "_id",
                foreignField: "request",
                as: MODEL_NAMES.REQUEST_PROCESS
            }
        },
        {
			$unwind: { path: `$${MODEL_NAMES.REQUEST_PROCESS}`, preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
        {
            $lookup: {
                from: pluralize(MODEL_NAMES.USER),
                localField: "requestor",
                foreignField: "_id",
                as: `${MODEL_NAMES.USER}`
            }
        },
        {
			$unwind: { path: `$${MODEL_NAMES.USER}`, preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
        {
            $lookup: {
                from: pluralize(MODEL_NAMES.DEPARTMENT),
                localField: "user.department",
                foreignField: "_id",
                as: `${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`
            }
        },
        {
			$unwind: { path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.DEPARTMENT}`, preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
        {
            $lookup: {
                from: pluralize(MODEL_NAMES.POSITION),
                localField: "user.position",
                foreignField: "_id",
                as: `${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`
            }
        },
        {
			$unwind: { path: `$${MODEL_NAMES.USER}.${MODEL_NAMES.POSITION}`, preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
        {
            $match: { isActive: true }
        },
        {
            $skip: 0, // Skip documents for pagination
          },
          {
            $limit: 10, // Limit the number of documents
          },
    ]).exec();;
};
