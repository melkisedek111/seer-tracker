"use server";
import ServerAction, {
	ParsedError,
	Response,
} from "@/app/actions/server-action.helper";
import { ROLES_OBJ } from "@/constants/index.constants";
import { MESSAGES } from "@/constants/message.constants";
import { SingleFileUpload } from "@/lib/file.helper";
import { CreateMISRequestSchema } from "@/schemas/request.schema";
import {
	TCreateRequestParams,
	TGetAllRequestParams,
	TGetAllRequestReturn,
} from "@/types/request.types";
import {
	createRequestUseCase,
	getAllRequestsUseCase,
} from "@/use-cases/request.use-case";
import { UploadRequestAttachments } from "@/utils/file-parser";
import { Socket } from "socket.io";

export const createRequestAction = ServerAction<
	{ isRequestCreated: boolean; requestId: string; requestedBy: string },
	TCreateRequestParams
>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN, ROLES_OBJ.EMPLOYEE] },
	CreateMISRequestSchema,
	async (params) => {
		try {
			const result = await createRequestUseCase(params);
			return Response<{
				isRequestCreated: boolean;
				requestId: string;
				requestedBy: string;
			}>({
				data: result,
				message: MESSAGES.CREATE_REQUEST_SUCCESS,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);

export const getAllRequestsActions = ServerAction<
	TGetAllRequestReturn[],
	TGetAllRequestParams
>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN, ROLES_OBJ.EMPLOYEE] },
	async (params) => {
		try {
			const page = params?.page || 1;
			const limit = params?.limit || 9;
			const keywords = params?.keywords || "";
			const serviceType = params?.serviceType || "";
			const requestProcess = params?.requestProcess || "";
			const priorityLevel = params?.priorityLevel || "";
			const from = params?.from || "";
			const to = params?.to || "";
			const result = await getAllRequestsUseCase({
				page,
				limit,
				keywords,
				serviceType,
				requestProcess,
				priorityLevel,
				from,
				to,
			});
			return Response<TGetAllRequestReturn[]>({
				data: result,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);
