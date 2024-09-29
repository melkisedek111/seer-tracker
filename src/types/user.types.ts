import { ROLES } from "@/constants/index.types";
import { UserType } from "@/models/user.model";
import mongoose from "mongoose";

export type TCreateUserParams = {
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: string;
	contact: string;
	email: string;
	homeAddress: string;
	position: string;
	department: string;
	employeeNumber: string;
	avatar?: FormData;
	roles?: string[] | null;
	username: string;
	password: string;
	confirmPassword: string;
	isRegisteredByAdmin: boolean
};

export type TRegisterUserParams = Omit<TCreateUserParams, "roles">;

export type TCreateUserReturn = {
	isUserCreated: boolean;
};

export type TGetAllUsersParams = {
	page: number;
	limit: number;
	keywords: string;
	department: string;
	position: string;
	role: string;
};


export type TSetUserStatusParams = {
	userId: string;
}

export type TSetUserStatusReturn = {
	isStatusUpdated: boolean | number;
}

export type TApprovedUserParams = {
	userId: string;
}

export type TApprovedUserReturn = {
	isApprovedUser: boolean | number;
}

export type TGetUserDetailParams = {
	userId: string;
}

export type TUpdateUserRoleParams = {
	userId: string;
	roles: string[];
}

export type TUpdateUserRoleReturn = {
	isRoleUpdated: boolean;
}

export type TUser = UserType;