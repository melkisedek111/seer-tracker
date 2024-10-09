import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import mongoose, { Document } from "mongoose";
import { UserType } from "./user.model";
import { RequestType } from "./request.model";

export type NotificationType = Document & {
	_id: string;
	user: UserType | string;
    requestSourceId: RequestType | string;
    userSourceId: UserType | string;
	type: string;
    title: string;
    message: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
};

const NotificationSchema = new mongoose.Schema<NotificationType>(
	{
        user: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: MODEL_NAMES.USER,
		},
        requestSourceId: {
			type: mongoose.Types.ObjectId,
			ref: MODEL_NAMES.REQUEST,
		},
        userSourceId: {
			type: mongoose.Types.ObjectId,
			ref: MODEL_NAMES.USER,
		},
		type: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
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

OverwriteSchema(MODEL_NAMES.NOTIFICATION);

const Notification =
	mongoose.models.Notification ||
	mongoose.model<NotificationType>(MODEL_NAMES.NOTIFICATION, NotificationSchema);

export default Notification;
