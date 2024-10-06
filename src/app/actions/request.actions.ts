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
import { createRequestUseCase, getAllRequestsUseCase } from "@/use-cases/request.use-case";
import { UploadRequestAttachments } from "@/utils/file-parser";

export const createRequestAction = ServerAction<
	{ isRequestCreated: boolean },
	TCreateRequestParams
>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN, ROLES_OBJ.EMPLOYEE] },
	CreateMISRequestSchema,
	async (params) => {
		try {
			const result = await createRequestUseCase(params);
			return Response<{ isRequestCreated: boolean }>({
				data: { isRequestCreated: result.isRequestCreated },
				message: MESSAGES.CREATE_REQUEST_SUCCESS,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);

export const getAllRequestsActions = ServerAction<TGetAllRequestReturn[], TGetAllRequestParams>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN, ROLES_OBJ.EMPLOYEE] },
	async (params) => {
		try {
			const page = params?.page || 1;
			const limit = params?.limit || 5;
			const keywords = params?.keywords || "";
			const serviceType = params?.serviceType || "";
			const serviceKeywordType = params?.serviceKeywordType || "";
			const dateRange = params?.dateRange || "";
			const result = await getAllRequestsUseCase({
				page,
				limit,
				keywords,
				serviceType,
				serviceKeywordType,
				dateRange,
			});
			return Response<TGetAllRequestReturn[]>({
				data: result,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);
