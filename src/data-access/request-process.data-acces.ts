import RequestProcess, {
	RequestProcessType,
} from "@/models/request-process.model";
import { ClientSession, FilterQuery } from "mongoose";

export const createRequestProcess = async (
	params: RequestProcessType,
	session?: ClientSession
) => {
	if (session) {
		return await RequestProcess.create([{...params}], { session: session });
	}
	return await RequestProcess.create(params);
};


export const getRequestProcessByParams = async (
	params: FilterQuery<RequestProcessType>
): Promise<RequestProcessType | null> => {
	return await RequestProcess.findOne(params).lean();
};