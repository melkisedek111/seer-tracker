import { GetSchemaName, MODEL_NAMES } from "@/constants/model.constants";
import User, { UserType } from "@/models/user.model";
import { TCreateUserParams, TGetAllUsersParams } from "@/types/user.types";
import mongoose from "mongoose";
import { ClientSession, Document, FilterQuery } from "mongoose";
import { PaginateModel, PaginateResult } from "mongoose";

export const getUserByEmailOrUsernameOrEmployeeNumber = async (
	value: string
): Promise<UserType | null> => {
	return await User.findOne({
		$or: [
			{
				email: value,
			},
			{
				username: value,
			},
			{
				employeeNumber: value,
			},
		],
	}).lean();
};

export const getUserByParams = async (
	params: FilterQuery<UserType>
): Promise<UserType | null> => {
	return await User.findOne(params).lean();
};

export const createUser = async (params: UserType) => {
	return await User.create(params);
};

export const getAllUsers = async (
	query: Object,
	params: { page: number; limit: number }
): Promise<PaginateResult<UserType>> => {
	return (await User.paginate(query, {
		lean: true,
		select: "-password",
		page: params.page,
		limit: params.limit,
		sort: {
			createdAt: -1,
		},
		populate: [
			{ path: MODEL_NAMES.POSITION },
			{ path: MODEL_NAMES.DEPARTMENT },
		],
	})) as PaginateResult<UserType>;
};

export const updateUserByUserId = async (params: Partial<UserType>) => {
	const { _id, ...otherUserData } = params;
	return await User.updateOne({ _id: _id }, { $set: { ...otherUserData } });
};

export const getUserDetailsById = async (
	{ id }: { id: string },
	session?: ClientSession
): Promise<UserType | null> => {
	if (session) {
		return await User.findOne({ _id: id }, { session: session })
			.populate(MODEL_NAMES.DEPARTMENT)
			.populate(MODEL_NAMES.POSITION)
			.lean();
	}
	return await User.findOne({ _id: id })
		.populate(MODEL_NAMES.DEPARTMENT)
		.populate(MODEL_NAMES.POSITION)
		.lean();
};

export const getUserDesignationWithPositionByDepartment = async (params: {
	departmentId: string;
}) => {
	return await User.aggregate([
		{
			$match: { department: new mongoose.Types.ObjectId(params.departmentId) }, // Match the users in the specified department
		},
		{
			$lookup: {
				from: GetSchemaName(MODEL_NAMES.DESIGNATION), // The collection name for the Designation model
				localField: "_id", // The field from the User collection (userId)
				foreignField: "user", // The field in the Designation collection that references the User
				as: MODEL_NAMES.DESIGNATION, // The alias for the joined designation data
			},
		},
		{
			$lookup: {
				from: GetSchemaName(MODEL_NAMES.DEPARTMENT), // The collection name for the Department model
				localField: "department", // The field from the User collection for the department
				foreignField: "_id", // The field in the Department collection
				as: MODEL_NAMES.DEPARTMENT, // Alias for the department data
			},
		},
		{
			$lookup: {
				from: GetSchemaName(MODEL_NAMES.POSITION), // The collection name for the Position model
				localField: "position", // The field from the User collection for the position
				foreignField: "_id", // The field in the Position collection
				as: MODEL_NAMES.POSITION, // Alias for the position data
			},
		},
		{
			$unwind: { path: "$designation", preserveNullAndEmptyArrays: true }, // Flatten the designation array
		},
		{
			$unwind: { path: "$department", preserveNullAndEmptyArrays: true }, // Flatten the department array
		},
		{
			$unwind: { path: "$position", preserveNullAndEmptyArrays: true }, // Flatten the position array
		},
		{
			$sort: { fullName: 1 }, // Sort by fullName in ascending order (1 for ascending, -1 for descending)
		},
	]);
};
