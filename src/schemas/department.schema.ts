import { z } from "zod";

export const CreateDepartmentSchema = z.object({
	name: z
		.string({
			required_error: "Department name is required.",
		})
		.min(1, {
			message: "Department name is required.",
		}),
	initials: z
		.string({
			required_error: "Department Initials name is required.",
		})
		.min(1, {
			message: "Department Initials name is required.",
		}),
});

export const GetDepartmentByIdSchema = z.object({
	departmentId: z
		.string({
			required_error: "Department ID is required.",
		})
		.min(1, {
			message: "Department ID is required.",
		}),
});

export const UpdateDepartmentSchema = z.object({
	departmentId: z
		.string({
			required_error: "Department ID is required.",
		})
		.min(1, {
			message: "Department ID is required.",
		}),
	name: z
		.string({
			required_error: "Department name is required.",
		})
		.min(1, {
			message: "Department name is required.",
		}),
	initials: z
		.string({
			required_error: "Department Initials name is required.",
		})
		.min(1, {
			message: "Department Initials name is required.",
		}),
});
