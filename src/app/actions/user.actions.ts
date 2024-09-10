"use server";
import ServerAction, {
	CustomThrowError,
	ParsedError,
	Response,
} from "@/lib/server-action.helper";
import User, { UserType } from "@/models/user.model";
import {
	TCreateUserParams,
	TCreateUserReturn,
	TGetAllUsersParams,
} from "@/types/user.types";
import { getFilterPositionsAndDepartmentsUseCase } from "@/use-cases/general.user-cases";
import { createUserUseCase, getAllUsersUseCase } from "@/use-cases/user.user-cases";
import mongoose, { PaginateResult } from "mongoose";
import { CreateUserSchema } from "@/schemas/user.schema";
import { MESSAGES } from "@/constants/message.constants";
import { getFileBuffer } from "@/lib/file.helper";

export const createUserAction = ServerAction<TCreateUserReturn, TCreateUserParams>(CreateUserSchema ,async (params) => {
	try {
		const user = await createUserUseCase(params);
		return Response<TCreateUserReturn>({ data: { isUserCreated: user.isUserCreated }, message: MESSAGES.USER_CREATE_SUCCESS });
	} catch (error) {
		return ParsedError(error);
	}
});

export const getAllUsersActions = ServerAction<
	any,
	TGetAllUsersParams
>(async (params) => {
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
		
		const usersWithAvatar = users.docs.map(user => {
			return {...user, avatar: user.avatar ? getFileBuffer("images", user.avatar) : null }
		});

		const modifiedUsers = {
			...users,
			docs: usersWithAvatar
		}
		return Response<any>({ data: modifiedUsers });
	} catch (error) {
		return ParsedError(error);
	}
});


