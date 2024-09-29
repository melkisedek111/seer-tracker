import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";
import { ServiceCategoryType } from "./service-category.model";
import { UserType } from "./user.model";
import { DepartmentType } from "./department.model";

export type RequestType = Document & {
	_id: string;
	title: string;
	serviceCategory: mongoose.Types.ObjectId | ServiceCategoryType;
	startDateTime: Date | null;
	endDateTime: Date | null;
	requestor: mongoose.Types.ObjectId | UserType;
	department: mongoose.Types.ObjectId | DepartmentType;
	requestUniqueId: string;
	services: string[] | null;
	otherServices: string[] | null;
	details: string;
	priorityLevel: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
};

const RequestSchema = new mongoose.Schema<RequestType>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		serviceCategory: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.SERVICE_CATEGORY,
		},
		startDateTime: {
			type: Date,
			default: null,
		},
		endDateTime: {
			type: Date,
			default: null,
		},
		requestUniqueId: {
			type: String,
			required: true,
            unique: true
		},
        details: {
			type: String,
			required: true,
		},
		requestor: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.USER,
		},
        department: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.DEPARTMENT,
		},
		services: {
			type: [String],
			default: []
		},
		otherServices: {
			type: [String],
			default: []
		},
		priorityLevel: {
			type: String,
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

OverwriteSchema(MODEL_NAMES.REQUEST);

const Department =
	mongoose.models.Request ||
	mongoose.model<RequestType>(MODEL_NAMES.REQUEST, RequestSchema);

export default Department;
