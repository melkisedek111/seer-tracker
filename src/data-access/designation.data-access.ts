import Department from "@/models/department.model";
import Designation, { DesignationType } from "@/models/designation.model";
import { TDesignation } from "@/types/designation.types";

export const createDesignation = async (params: DesignationType) => {
	return await Designation.create(params);
};

export const getDesignationByParams = async (params: Partial<TDesignation>) => {
	return await Designation.findOne(params).lean();
};

export const updateDesignationById = async (params: {
	_id: string;
	designation: string | null;
	designatedAt: Date;
}) => {
	return await Designation.updateOne(
		{ _id: params._id },
		{ designation: params.designation, designated: params.designatedAt }
	);
};

export const removeDesignationById = async (params: { _id: string }) => {
	return await Designation.deleteOne({ _id: params._id });
};

export const getAllDesignation = async () => {
	return await Department.aggregate([
		{
			$lookup: {
				from: "users", // The collection name for the User model
				localField: "_id", // The field from Department to match in User (assuming department is stored in User)
				foreignField: "department", // The field in User that references the department
				as: "users", // The alias for the users data
			},
		},
		{
			$unwind: { path: "$users", preserveNullAndEmptyArrays: true }, // Flatten users array to work with individual users
		},
		{
			$lookup: {
				from: "designations", // The collection name for the Designation model
				localField: "users._id", // The field from User (userId)
				foreignField: "user", // The field in Designation that references the User
				as: "users.designation", // The alias for the designation data under each user
			},
		},
		{
			$unwind: { path: "$users.designation", preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
        {
			$lookup: {
				from: "positions", // The collection name for the Designation model
				localField: "users.position", // The field from User (userId)
				foreignField: "_id", // The field in Designation that references the User
				as: "users.position", // The alias for the designation data under each user
			},
		},
		{
			$unwind: { path: "$users.position", preserveNullAndEmptyArrays: true }, // Flatten the designation array for each user
		},
		{
			$match: { "users.designation": { $ne: null } }, // Only keep users who have a designation
		},
		{
			$group: {
				_id: "$_id", // Group by department _id
				department: { $first: "$name" }, // Assuming department has a 'name' field
				users: {
					$push: {
						_id: "$users._id",
						fullName: "$users.fullName",
						avatar: "$users.avatar",
						employeeNumber: "$users.employeeNumber",
						designation: "$users.designation",
                        position: "$users.position.name"
					},
				}, // Collect users for each department
			},
		},
		{
			$sort: { department: 1 }, // Optional: Sort departments by name
		},
	]).exec();
};
