"use server";

import { ROLES, ROLES_OBJ } from "@/constants/index.constants";
import ServerAction, {
	ParsedError,
	Response,
} from "@/app/actions/server-action.helper";
import { AssignDesignationSchema } from "@/schemas/designation.schema";
import {
	TAssignDesignationParams,
	TAssignDesignationReturn,
	TGetAllDesignation,
} from "@/types/designation.types";
import {
	assignDesignationUseCase,
	getAllDesignationUseCase,
} from "@/use-cases/designation.use-case";

export const assignDesignationAction = ServerAction<
	TAssignDesignationReturn,
	TAssignDesignationParams
>(
	{
		authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN],
	},
    AssignDesignationSchema,
	async (params) => {
		try {
			const designation = await assignDesignationUseCase(params);
			return Response<TAssignDesignationReturn>({
				data: { isUserAssigned: designation.isUserAssigned },
				message: designation.message,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);

export const getAllDesignationActions = ServerAction<TGetAllDesignation[], any>(
	{
		authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN],
	},
	async () => {
		try {
			const designations = await getAllDesignationUseCase();
			return Response<TGetAllDesignation[]>({ data: designations });
		} catch (error) {
			return ParsedError(error);
		}
	}
);
