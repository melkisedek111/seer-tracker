import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";
import { UserType } from "./user.model";
import { DepartmentType } from "./department.model";

export type DesignationType = Document & {
	_id: string;
	user: string | UserType;
	department: string | DepartmentType;
    designation: string | null;
    designatedAt: Date;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
};

const DesignationSchema = new mongoose.Schema<DesignationType>(
	{
		user: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.USER,
		},
		department: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.DEPARTMENT,
		},
        designation: {
            type: String,
        },
        designatedAt: {
            type: Date,
            required: true
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

OverwriteSchema(MODEL_NAMES.DESIGNATION);

const Designation =
	mongoose.models.Designation ||
	mongoose.model<DesignationType>(MODEL_NAMES.DESIGNATION, DesignationSchema);

export default Designation;
