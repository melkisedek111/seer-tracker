import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";
import { UserType } from "./user.model";
import { RequestType } from "./request.model";

export type NotificationCountType = Document & {
	_id: string;
	user: UserType | string;
    count: number;
    isSeen: boolean;
    message: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
};

const NotificationCountSchema = new mongoose.Schema<NotificationCountType>(
	{
        user: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.USER,
		},
		count: {
			type: Number,
            default: 0,
			required: true,
		},
		isSeen: {
			type: Boolean,
            default: null
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

OverwriteSchema(MODEL_NAMES.NOTIFICATION_COUNT);

const NotificationCount =
	mongoose.models.NotificationCount ||
	mongoose.model<NotificationCountType>(MODEL_NAMES.NOTIFICATION_COUNT, NotificationCountSchema);

export default NotificationCount;
