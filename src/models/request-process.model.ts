import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";
import { ServiceCategoryType } from "./service-category.model";
import { UserType } from "./user.model";
import { RequestType } from "./request.model";

export type TFilingUp = {
	isCompleted: boolean;
};

export type TUnitApproval = {
	acknowledgeBy: UserType | null;
	approvedAt: Date | null;
	isRejected: boolean | null;
	rejectedAt: Date | null;
};

export type TRecommendingApproval = {
	// for BUGS
	acknowledgeBy: UserType | null;
	approvedAt: Date | null;
	isRejected: boolean | null;
	rejectedAt: Date | null;
};

export type TServiceUnitApproval = {
	// for BUGS
	acknowledgeBy: UserType | null;
	serviceUnit: ServiceCategoryType | null;
	approvedAt: Date | null;
	isRejected: boolean | null;
	rejectedAt: Date | null;
};

export type TConfirmation = {
	confirmedBy: UserType | null;
	confirmedAt: Date | null;
	isRejected: boolean | null;
	rejectedAt: Date | null;
};

export type TAssignedPerson = {
	assignedTo: UserType | null;
	assignedBy: UserType | null;
	assignedAt: Date | null;
	isRejected: boolean | null;
	rejectedAt: Date | null;
};

export type RequestProcessType = Document & {
	_id: string;
	request: RequestType;
	filingUp: TFilingUp;
	unitApproval: TUnitApproval;
	recommendingApproval: TRecommendingApproval;
	serviceUnitApproval: TServiceUnitApproval;
	confirmation: TConfirmation;
	assignedPerson: TAssignedPerson;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
};

export const defaultRequestProcess = {
	filingUp: {
		isCompleted: true,
	},
	unitApproval: {
		acknowledgeBy: null,
		approvedAt: null,
		rejectedAt: null,
		isRejected: null,
	},
	recommendingApproval: {
		acknowledgeBy: null,
		approvedAt: null,
		rejectedAt: null,
		isRejected: null,
	},
	serviceUnitApproval: {
		acknowledgeBy: null,
		serviceUnit: null,
		approvedAt: null,
		rejectedAt: null,
		isRejected: null,
	},
	confirmation: {
		confirmedBy: null,
		confirmedAt: null,
		rejectedAt: null,
		isRejected: null,
	},
	assignedPerson: {
		assignedTo: null,
		assignedBy: null,
		assignedAt: null,
		rejectedAt: null,
		isRejected: null,
	},
};

const UnitApprovalSchema = new mongoose.Schema<TUnitApproval>(
	{
		acknowledgeBy: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		approvedAt: {
			type: Date,
			default: null,
		},
		rejectedAt: {
			type: Date,
			default: null,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const RecommendingApprovalSchema = new mongoose.Schema<TRecommendingApproval>(
	{
		acknowledgeBy: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		approvedAt: {
			type: Date,
			default: null,
		},
		rejectedAt: {
			type: Date,
			default: null,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const ServiceUnitApprovalSchema = new mongoose.Schema<TServiceUnitApproval>(
	{
		acknowledgeBy: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		serviceUnit: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.SERVICE_CATEGORY,
		},
		approvedAt: {
			type: Date,
			default: null,
		},
		rejectedAt: {
			type: Date,
			default: null,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const FilingUpSchema = new mongoose.Schema<TFilingUp>(
	{
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const ConfirmationSchema = new mongoose.Schema<TConfirmation>(
	{
		confirmedBy: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		confirmedAt: {
			type: Date,
			default: null,
		},
		rejectedAt: {
			type: Date,
			default: null,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const AssignedPersonSchema = new mongoose.Schema<TAssignedPerson>(
	{
		assignedTo: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		assignedBy: {
			type: mongoose.Types.ObjectId,
			default: null,
			ref: MODEL_NAMES.USER,
		},
		assignedAt: {
			type: Date,
			default: null,
		},
		rejectedAt: {
			type: Date,
			default: null,
		},
		isRejected: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false }
);

const RequestProcessSchema = new mongoose.Schema<RequestProcessType>(
	{
		request: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.REQUEST,
		},
		filingUp: {
			type: FilingUpSchema,
			required: true,
		},
		unitApproval: {
			type: UnitApprovalSchema,
			required: true,
		},
		recommendingApproval: {
			type: RecommendingApprovalSchema,
			required: true,
		},
		serviceUnitApproval: {
			type: ServiceUnitApprovalSchema,
			required: true,
		},
		confirmation: {
			type: ConfirmationSchema,
			required: true,
		},
		assignedPerson: {
			type: AssignedPersonSchema,
			required: true,
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

OverwriteSchema(MODEL_NAMES.REQUEST_PROCESS);

const RequestProcess =
	mongoose.models.RequestProcess ||
	mongoose.model<RequestProcessType>(
		MODEL_NAMES.REQUEST_PROCESS,
		RequestProcessSchema
	);

export default RequestProcess;
