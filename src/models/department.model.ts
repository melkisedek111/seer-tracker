import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";

export type DepartmentType = Document & {
	_id: string;
	name: string;
	initials: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
};

const DepartmentSchema = new mongoose.Schema<DepartmentType>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		initials: {
			type: String,
			required: true,
			unique: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isArchived: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

OverwriteSchema(MODEL_NAMES.DEPARTMENT);

const Department =
	mongoose.models.Department ||
	mongoose.model<DepartmentType>(MODEL_NAMES.DEPARTMENT, DepartmentSchema);

export default Department;
