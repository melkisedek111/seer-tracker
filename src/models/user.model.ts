import { ROLES } from "@/constants/index.types";
import { MODEL_NAMES } from "@/constants/model.constants";
import { OverwriteSchema } from "@/lib/mongodb";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose, { Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { PositionType } from "./position.model";
import { DepartmentType } from "./department.model";

export type UserType = Document & {
	_id: string;
	fullName: string;
	firstName: string;
	middleName: string | null;
	lastName: string;
	gender: string;
	contact: string;
	email: string;
	homeAddress: string;
	position: PositionType | mongoose.Types.ObjectId; // Add PositionType if populated
	department: DepartmentType | mongoose.Types.ObjectId; // Add DepartmentType if populated
	employeeNumber: string;
	avatar: string | null;
	role: string[] | null;
	username: string;
	password: string;
	isApproved: boolean | null;
	approvedAt: Date | null;
	isRegisteredByAdmin: boolean;
	isDeleted: boolean;
	isActive: boolean;
	isArchived: boolean;
	createdAt: Date;
};

const UserSchema = new mongoose.Schema<UserType>(
	{
		fullName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		homeAddress: {
			type: String,
			required: true,
		},
		position: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_NAMES.POSITION,
			required: true,
		},
		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_NAMES.DEPARTMENT,
			required: true,
		},
		employeeNumber: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		role: {
			type: [String],
			enum: ROLES,
			default: null
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		approvedAt: {
			type: Date,
			default: null,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		isRegisteredByAdmin: {
			type: Boolean,
			default: false,
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

OverwriteSchema(MODEL_NAMES.USER);

// UserSchema.virtual('fullName').
//   get(function() { return `${this.firstName} ${this.middleName} ${this.lastName}`; }).
//   set(function(v) {
//     // `v` is the value being set, so use the value to set
//     // `firstName` and `lastName`.
//     const firstName = v.substring(0, v.indexOf(' '));
//     const lastName = v.substring(v.indexOf(' ') + 1);
// 	console.log(firstName, lastName)
//     this.set({ firstName, lastName });
//   });

// UserSchema.virtual("fullName").get(function () {
// 	return [this.firstName, this.middleName, this.lastName]
// 		.filter(Boolean)
// 		.join(" ");
// });
UserSchema.plugin(paginate);

const User = mongoose.model<UserType, mongoose.PaginateModel<UserType>>(
	MODEL_NAMES.USER,
	UserSchema
);

export const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);

export default User;
