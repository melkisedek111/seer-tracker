import Department, { DepartmentType } from "@/models/department.model";
import Position, { PositionType } from "@/models/position.model";
import { TCreateDepartmentParams, TUpdateDepartmentParams } from "@/types/department.types";
import { TCreatePositionParams, TUpdatePositionParams } from "@/types/position.types";
import { TCreateUserParams } from "@/types/user.types";
import mongoose from "mongoose";

export const createDepartment = async (params: TCreateDepartmentParams) => {
	return await Department.create(params);
};

export const getDepartmentByParams = async (params: { name?: string; initials?: string}): Promise<DepartmentType | null> => {
	return await Department.findOne(params);
};

export const getDepartments = async (): Promise<DepartmentType[]> => {
	return await Department.find();
}

export const getDepartmentsBySelection = async (): Promise<DepartmentType[]> => {
	return await Department.find({
		isDeleted: false,
		isActive: true,
		isArchived: false
	}).select("_id name initials");
}

export const getDepartmentId = async (departmentId: string): Promise<DepartmentType | null> => {
	return await Department.findById(new mongoose.Types.ObjectId(departmentId));
}

export const updateDepartment = async (params: TUpdateDepartmentParams) => {
	return await Department.updateOne({_id: new mongoose.Types.ObjectId(params.departmentId)}, { name: params.name, initials: params.initials})
}