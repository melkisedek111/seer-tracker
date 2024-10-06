import RequestProcess, {
	RequestProcessType,
} from "@/models/request-process.model";
import { ClientSession } from "mongoose";

export const createRequestProcess = async (
	params: RequestProcessType,
	session?: ClientSession
) => {
	if (session) {
		return await RequestProcess.create([{...params}], { session: session });
	}
	return await RequestProcess.create(params);
};
