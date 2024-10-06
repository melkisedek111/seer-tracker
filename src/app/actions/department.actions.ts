"use server";
import ServerAction, {
	ParsedError,
	Response,
} from "@/app/actions/server-action.helper";
import { DepartmentType } from "@/models/department.model";
import { CreateDepartmentSchema, GetDepartmentByIdSchema, GetUsersWithDesignationByDepartmentSchema, UpdateDepartmentSchema } from "@/schemas/department.schema";
import { TCreateDepartmentParams, TCreateDepartmentReturn, TGetDepartmentByIdParams, TGetUsersWithDesignationByDepartmentIdParams, TGetUsersWithDesignationByDepartmentIdReturn, TUpdateDepartmentParams, TUpdateDepartmentReturn } from "@/types/department.types";
import { createDepartmentUseCase, getDepartmentByIdUseCase, getDepartmentsUseCase, getUsersWithDesignationByDepartmentIdUseCase, updateDepartmentUseCase } from "@/use-cases/department.use-cases";
import { createPositionUseCase } from "@/use-cases/position.use-cases";


export const getDepartmentsAction = ServerAction<DepartmentType[], undefined>(async () => {
	try {
        const departments = await getDepartmentsUseCase();
		return Response<DepartmentType[]>({ data: departments });
	} catch (error) {
		return ParsedError(error);
	}
});

export const createDepartmentAction = ServerAction<TCreateDepartmentReturn, TCreateDepartmentParams>(CreateDepartmentSchema, async (params) => {
	try {
        const positionCreated = await createDepartmentUseCase(params);
		return Response<TCreateDepartmentReturn>({ data: { isDepartmentCreated: true }, message: "Department is created." });
	} catch (error) {
		return ParsedError(error);
	}
});


export const getDepartmentByIdAction = ServerAction<DepartmentType, TGetDepartmentByIdParams>(GetDepartmentByIdSchema, async (params) => {
	try {
        const position = await getDepartmentByIdUseCase(params);
		return Response<DepartmentType>({ data: position });
	} catch (error) {
		return ParsedError(error);
	}
});

export const updateDepartmentAction = ServerAction<TUpdateDepartmentReturn, TUpdateDepartmentParams>(UpdateDepartmentSchema, async (params) => {
	try {
		const department = await updateDepartmentUseCase(params);
		return Response<TUpdateDepartmentReturn>({ data: { isDepartmentUpdated: true }, message: "Department is updated." });
	} catch (error) {
		return ParsedError(error);
	}
});

export const getUsersWithDesignationByDepartmentIdAction = ServerAction<TGetUsersWithDesignationByDepartmentIdReturn[], TGetUsersWithDesignationByDepartmentIdParams>(GetUsersWithDesignationByDepartmentSchema, async (params) => {
	try {
		const users = await getUsersWithDesignationByDepartmentIdUseCase(params);
		return Response<TGetUsersWithDesignationByDepartmentIdReturn[]>({ data: users });
	} catch (error) {
		return ParsedError(error);
	}
});