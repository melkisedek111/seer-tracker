import { ROLES } from "@/constants/index.types";
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
	roles: string[];
	username: string;
	password: string;
	confirmPassword: string;
};

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
