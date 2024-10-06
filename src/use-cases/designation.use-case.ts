import { DESIGNATION_LIST, DESIGNATIONS } from "@/constants/index.constants";
import { MESSAGES } from "@/constants/message.constants";
import {
	createDesignation,
	getAllDesignation,
	getDesignationByParams,
	removeDesignationById,
	updateDesignationById,
} from "@/data-access/designation.data-access";
import { getUserByParams } from "@/data-access/user.data-access";
import { getFileBuffer } from "@/lib/file.helper";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { DesignationType } from "@/models/designation.model";
import { UserType } from "@/models/user.model";
import {
	TAssignDesignationParams,
	TDesignation,
	TGetAllDesignation,
} from "@/types/designation.types";
import mongoose from "mongoose";

export const assignDesignationUseCase = async (
	params: TAssignDesignationParams
) => {
	const user = await getUserByParams({
		_id: params.userId,
	});

	if (![...DESIGNATION_LIST, "none"].includes(params.designation))
		throw new CustomThrowError(MESSAGES.DESIGNATION_NOT_EXISTS);
	if (!user) throw new CustomThrowError(MESSAGES.USER_NOT_EXISTS);

	const designation = (await getDesignationByParams({
		user: user._id,
		department: user.department.toString(),
	})) as TDesignation;

	if (designation) {
		if (params.designation === "none") {
			const removeDesignation = await removeDesignationById({
				_id: designation._id,
			});

			if (!removeDesignation)
				throw new CustomThrowError(MESSAGES.REMOVE_DESIGNATION_FAILED);

			return {
				isUserAssigned: true,
				message: `${user.fullName} has been removed as ${designation.designation}.`,
			};
		}

		const updatedDesignation = await updateDesignationById({
			_id: designation._id,
			designation: params.designation === "none" ? null : params.designation,
			designatedAt: new Date(),
		});

		if (!updatedDesignation)
			throw new CustomThrowError(MESSAGES.ASSIGN_DESIGNATION_FAILED);
	} else {
		const designationDetails = {
			user: user._id.toString(),
			designation: params.designation,
			department: user.department.toString(),
			designatedAt: new Date(),
		} as DesignationType;
		const assignDesignation = await createDesignation(designationDetails);

		if (!assignDesignation)
			throw new CustomThrowError(MESSAGES.ASSIGN_DESIGNATION_FAILED);
	}

	return {
		isUserAssigned: true,
		message: `${user.fullName} has been assigned as ${params.designation}.`,
	};
};

export const getAllDesignationUseCase = async () => {
	const designations = await getAllDesignation();
	const designationByDepartment = designations.map((department) => ({
		...department,
		users: department.users.map((user: UserType) => ({
			...user,
			avatar: user.avatar ? getFileBuffer("images", user.avatar) : null,
		})),
	}));
	return designationByDepartment as TGetAllDesignation[];
};
