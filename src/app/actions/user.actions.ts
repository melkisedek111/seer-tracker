"use server";
import ServerAction, {
	CustomThrowError,
	ParsedError,
	Response,
} from "@/lib/server-action.helper";
import User, { UserType } from "@/models/user.model";
import {
	TApprovedUserParams,
	TApprovedUserReturn,
	TCreateUserParams,
	TCreateUserReturn,
	TGetAllUsersParams,
	TGetUserDetailParams,
	TRegisterUserParams,
	TSetUserStatusParams,
	TSetUserStatusReturn,
	TUpdateUserRoleParams,
	TUpdateUserRoleReturn,
	TUser,
} from "@/types/user.types";
import { getFilterPositionsAndDepartmentsUseCase } from "@/use-cases/general.user-cases";
import {
	approvedUserUseCase,
	createUserUseCase,
	getAllUsersUseCase,
	getUserDetailsUseCase,
	setUserStatusUseCase,
	updateUserRoleUseCase,
} from "@/use-cases/user.user-cases";
import mongoose, { PaginateResult } from "mongoose";
import {
	ApprovedUserSchema,
	CreateUserSchema,
	GetUserDetailsSchema,
	RegisterUserWithNoRoleSchema,
	SetUserStatusSchema,
	UpdateRoleSchema,
} from "@/schemas/user.schema";
import { MESSAGES } from "@/constants/message.constants";
import { getFileBuffer } from "@/lib/file.helper";

export const createUserAction = ServerAction<
	TCreateUserReturn,
	TCreateUserParams
>(CreateUserSchema, async (params) => {
	try {
		const user = await createUserUseCase(params);
		return Response<TCreateUserReturn>({
			data: { isUserCreated: user.isUserCreated },
			message: MESSAGES.USER_CREATE_SUCCESS,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const getAllUsersActions = ServerAction<any, TGetAllUsersParams>(
	async (params) => {
		try {
			const page = params?.page || 1;
			const limit = params?.limit || 5;
			const keywords = params?.keywords || "";
			const position = params?.position || "";
			const department = params?.department || "";
			const role = params?.role || "";
			const users = await getAllUsersUseCase({
				page,
				limit,
				keywords,
				position,
				department,
				role,
			});

			const usersWithAvatar = users.docs.map((user) => {
				return {
					...user,
					avatar: user.avatar ? getFileBuffer("images", user.avatar) : null,
				};
			});

			const modifiedUsers = {
				...users,
				docs: usersWithAvatar,
			};
			return Response<any>({ data: modifiedUsers });
		} catch (error) {
			return ParsedError(error);
		}
	}
);

export const setUserStatusAction = ServerAction<
	TSetUserStatusReturn,
	TSetUserStatusParams
>(SetUserStatusSchema, async (params) => {
	try {
		const user = await setUserStatusUseCase(params);
		return Response<TSetUserStatusReturn>({
			data: { isStatusUpdated: user.modifiedCount },
			message: MESSAGES.USER_STATUS_UPDATED,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const approvedUserAction = ServerAction<
	TApprovedUserReturn,
	TApprovedUserParams
>(ApprovedUserSchema, async (params) => {
	try {
		const user = await approvedUserUseCase(params);
		return Response<TApprovedUserReturn>({
			data: { isApprovedUser: user.modifiedCount },
			message: MESSAGES.USER_APPROVED_SUCCESS,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const registerUserAction = ServerAction<
	TCreateUserReturn,
	TRegisterUserParams
>(RegisterUserWithNoRoleSchema, async (params) => {
	try {
		const user = await createUserUseCase(params);
		return Response<TCreateUserReturn>({
			data: { isUserCreated: user.isUserCreated },
			message: MESSAGES.ACCOUNT_REGISTER_SUCCESS,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const updateUserRoleAction = ServerAction<
TUpdateUserRoleReturn,
TUpdateUserRoleParams
>(UpdateRoleSchema, async (params) => {
	try {
		const user = await updateUserRoleUseCase(params);
		return Response<TCreateUserReturn>({
			data: { isUserCreated: user.isRoleUpdated },
			message: MESSAGES.USER_UPDATED_ROLES_SUCCESS,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const getUserDetailsAction = ServerAction<
TUser,
TGetUserDetailParams
>(GetUserDetailsSchema, async (params) => {
	try {
		const user = await getUserDetailsUseCase(params);
		return Response<TUser>({
			data: user,
		});
	} catch (error) {
		return ParsedError(error);
	}
});