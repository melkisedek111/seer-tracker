import Position, { PositionType } from "@/models/position.model";
import {
	TCreatePositionParams,
	TUpdatePositionParams,
} from "@/types/position.types";
import { TCreateUserParams } from "@/types/user.types";
import mongoose from "mongoose";

export const createPosition = async (params: TCreatePositionParams) => {
	return await Position.create(params);
};

export const getPositionByName = async (
	name: string
): Promise<PositionType | null> => {
	return await Position.findOne({
		name: name,
	});
};

export const getPositions = async (): Promise<PositionType[]> => {
	return await Position.find();
};

export const getPositionsBySelection = async (): Promise<PositionType[]> => {
	return await Position.find({
		isDeleted: false,
		isActive: true,
		isArchived: false,
	}).select("_id name");
};

export const getPositionById = async (
	positionId: string
): Promise<PositionType | null> => {
	return await Position.findById(new mongoose.Types.ObjectId(positionId));
};

export const updatePosition = async (params: TUpdatePositionParams) => {
	return await Position.updateOne(
		{ _id: new mongoose.Types.ObjectId(params.positionId) },
		{ name: params.name }
	);
};
