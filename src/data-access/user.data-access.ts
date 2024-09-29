import User, { UserType } from "@/models/user.model";
import { TCreateUserParams, TGetAllUsersParams } from "@/types/user.types";
import { Document, FilterQuery } from "mongoose";
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
			createdAt: -1
		},
		populate: [{ path: "position" }, { path: "department" }],
	})) as PaginateResult<UserType>;
};

export const updateUserByUserId = async (params: Partial<UserType>) => {
	const { _id, ...otherUserData } = params;
	return await User.updateOne(
		{ _id: _id },
		{ $set: { ...otherUserData} }
	)
}