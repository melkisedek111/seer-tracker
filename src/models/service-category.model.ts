import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";

export type ServiceCategoryType = Document & {
    _id: string;
	initials: string;
	name: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const ServiceCategorySchema = new mongoose.Schema<ServiceCategoryType>(
	{
		initials: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
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

OverwriteSchema(MODEL_NAMES.SERVICE_CATEGORY);

const ServiceCategory =
	mongoose.models.ServiceCategory ||
	mongoose.model<ServiceCategoryType>(MODEL_NAMES.SERVICE_CATEGORY, ServiceCategorySchema);

export default ServiceCategory;
