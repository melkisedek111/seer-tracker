import { MESSAGES } from "@/constants/message.constants";
import {
	createUser,
	getAllUsers,
	getUserByParams,
	updateUserByUserId,
} from "@/data-access/user.data-access";
import { deleteFile, SingleFileUpload } from "@/lib/file.helper";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { TApprovedUserParams, TCreateUserParams, TGetAllUsersParams, TGetUserDetailParams, TRegisterUserParams, TSetUserStatusParams, TUpdateUserRoleParams } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserType } from "@/models/user.model";
import { ROLES, ROLES_OBJ } from "@/constants/index.constants";

export const createUserUseCase = async (params: TCreateUserParams & TRegisterUserParams) => {
	const errors: Record<string, string> = {};
	let avatarName: string | null = null;

	try {
		const userByEmail = await getUserByParams({ email: params.email });
		if (userByEmail) errors["email"] = MESSAGES.USER_EMAIL_EXISTS;

		const userByEmployeeNumber = await getUserByParams({
			employeeNumber: params.employeeNumber,
		});
		if (userByEmployeeNumber)
			errors["employeeNumber"] = MESSAGES.USER_EMPLOYEE_EXISTS;

		const userByUsername = await getUserByParams({ username: params.username });
		if (userByUsername) errors["username"] = MESSAGES.USER_USERNAME_EXISTS;

		if (Object.keys(errors).length) {
			throw new CustomThrowError(errors);
		}

		if (params?.avatar) {
			const avatar = params.avatar.get("avatar") as File | null;
			const fileName = [params.firstName, params.lastName]
				.join("_")
				.toUpperCase();
			if (avatar) {
				avatarName = await SingleFileUpload(avatar, "images", fileName);
			}
		}

		const hashedPassword = bcrypt.hashSync(params.password, 10);

		const data = {
			fullName: [params.firstName, params.middleName || "", params.lastName].join(
				" "
			),
			firstName: params.firstName,
			middleName: params.middleName || null,
			lastName: params.lastName,
			gender: params.gender,
			contact: params.contact,
			email: params.email,
			homeAddress: params.homeAddress,
			position: new mongoose.Types.ObjectId(params.position),
			department: new mongoose.Types.ObjectId(params.department),
			employeeNumber: params.employeeNumber,
			avatar: avatarName,
			role: params.roles || null,
			username: params.username,
			password: hashedPassword,
			approvedAt: params.roles?.includes(ROLES_OBJ.SUPER_ADMIN) ? new Date() : null,
			isApproved: params.roles ? true : false,
			isRegisteredByAdmin: params.isRegisteredByAdmin,
		} as UserType;

		const user = await createUser(data);

		if(!user) {
			throw new CustomThrowError(MESSAGES.USER_CREATE_FAILED);
		}

		return { isUserCreated: true };
	} catch (error: any) {
		await deleteFile("images", avatarName);
		throw new CustomThrowError(error.message);
	}
};

export const getAllUsersUseCase = async (params: TGetAllUsersParams) => {
	const query: Record<string, any> = {};
	const { page, limit } = params;

	if (params.keywords) {
		query["$or"] = [
			{ fullName: { $regex: params.keywords.trim(), $options: "i" } },
			{ employeeNumber: { $regex: params.keywords.trim(), $options: "i" } },
		];
	}

	if (params.department) {
		query["department"] = new mongoose.Types.ObjectId(params.department);
	}

	if (params.position) {
		query["position"] = new mongoose.Types.ObjectId(params.position);
	}

	if (params.role) {
		query["role"] = { $in: [params.role] };
	}

	return await getAllUsers(query, { page, limit });
};


export const setUserStatusUseCase = async (params: TSetUserStatusParams) => {
	const user = await getUserByParams({
		_id: params.userId
	})
	
	if(!user) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);

	const status = await updateUserByUserId({
		_id: user._id,
		isActive: !user.isActive
	})

	return status;
}

export const approvedUserUseCase = async (params: TApprovedUserParams) => {
	const user = await getUserByParams({
		_id: params.userId
	})
	
	if(!user) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);

	const approvedUser = await updateUserByUserId({
		_id: user._id,
		isApproved: true
	})

	return approvedUser;
}

export const updateUserRoleUseCase = async (params: TUpdateUserRoleParams) => {
	const user = await getUserByParams({
		_id: params.userId
	})
	
	if(!user) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);
	
	const updatedRoles = await updateUserByUserId({
		_id: user._id,
		role: params.roles
	})
	
	if(!updatedRoles.modifiedCount) throw new CustomThrowError(MESSAGES.USER_UPDATED_ROLES_FAILED);

	return { isRoleUpdated: true };
}

export const getUserDetailsUseCase = async (params: TGetUserDetailParams) => {
	const user = await getUserByParams({
		_id: params.userId
	})
	
	if(!user) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);

	const { password } = user;
	user.password = "";
	return user;
}