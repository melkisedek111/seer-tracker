import { TDepartment } from "./department.types";
import { TUser } from "./user.types";

export type TDesignation = {
	_id: string;
	user: string;
	department: string;
	designation: string;
	isActive: boolean;
	isDeleted: boolean;
	isArchived: boolean;
	designatedAt: Date;
};

export type TAssignDesignationParams = {
	userId: string;
	designation: string;
};

export type TAssignDesignationReturn = {
	isUserAssigned: boolean;
};

export type TGetDesignationUser = {
    _id: string;
    fullName: string;
    avatar: string;
    employeeNumber: string;
    position: string;
    designation: TDesignation | null;
}

export type TGetAllDesignation = {
	_id: string;
	department: string;
	users: TGetDesignationUser[];
};
