import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";

export type PositionType = Document & {
    _id: string;
	name: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const PositionSchema = new mongoose.Schema<PositionType>(
	{
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

OverwriteSchema(MODEL_NAMES.POSITION);

const Position =
	mongoose.models.Position ||
	mongoose.model<PositionType>(MODEL_NAMES.POSITION, PositionSchema);

export default Position;
