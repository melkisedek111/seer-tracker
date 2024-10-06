import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document, Schema } from "mongoose";
import { ServiceCategoryType } from "./service-category.model";
import { UserType } from "./user.model";
import { DepartmentType } from "./department.model";
import paginate from "mongoose-paginate-v2";

export type RequestType = Document & {
	_id: string;
	title: string;
	serviceCategory: mongoose.Types.ObjectId | ServiceCategoryType;
	requestUniqueId: string;
	requestor: mongoose.Types.ObjectId | UserType;
	department: mongoose.Types.ObjectId | DepartmentType;
	problemDetails: any[];
	priorityLevel: string;
	services: string[] | null;
	problemType: string | null;
	otherProblem: string | null;
	otherService: string | null;
	currentStatus: string | null;
	attachments: string[] | null;
	startDateTime: Date | null;
	endDateTime: Date | null;
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
        problemDetails: {
			type: Schema.Types.Mixed,
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
		otherService: {
			type: String,
			default: null
		},
		otherProblem: {
			type: String,
			default: null
		},
		problemType: {
			type: String,
			default: null
		},
		currentStatus: {
			type: String,
			default: null
		},
		priorityLevel: {
			type: String,
			required: true
		},
		attachments: {
			type: [String],
			default: []
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

RequestSchema.plugin(paginate);

const Request = mongoose.model<RequestType, mongoose.PaginateModel<RequestType>>(
	MODEL_NAMES.REQUEST,
	RequestSchema
);

// const Request =
// 	mongoose.models.Request ||
// 	mongoose.model<RequestType>(MODEL_NAMES.REQUEST, RequestSchema);

export default Request;
