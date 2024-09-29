import { ROLES } from "@/constants/index.types";
import { any, z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
// const CreateUserSchema = z.object({
//     fullName: z.string({ required_error: "Full name is required" }),
//     firstName: z.string({ required_error: "First name is required" }),
//     middleName: z.string().nullable().optional(),
//     lastName: z.string({ required_error: "Last name is required" }),
//     gender: z.string({ required_error: "Gender is required" }),
//     contact: z.string({ required_error: "Contact is required" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     homeAddress: z.string({ required_error: "Home address is required" }),
//     position: z.string({ required_error: "Position is required" }), // Assuming PositionType is an enum
//     department: z.string({ required_error: "Department is required" }), // Assuming DepartmentType is an enum
//     employeeNumber: z.string({ required_error: "Employee number is required" }),
//     avatar: z.string().nullable().optional(),
//     role: z.array(z.enum(ROLES as any)),
//     username: z.string({ required_error: "Username is required" }),
//     password: z.string({ required_error: "Password is required" }),
//     confirmPassword: z.string({ required_error: "Password is required" }),
//   });
const ACCEPTED_IMAGE_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const AvatarSchema = z.object({
	avatar: z
		.any()
		.refine((file) => {
			return file.size <= MAX_FILE_SIZE;
		}, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		)
		.optional(),
});

export const CreateUserSchema = z.object({
	firstName: z
		.string({
			required_error: "First name is required.",
		})
		.min(1, {
			message: "First name is required.",
		}),
	middleName: z.string().optional(),
	lastName: z
		.string({
			required_error: "Last name is required.",
		})
		.min(1, {
			message: "Last name is required.",
		}),
	gender: z
		.string({
			required_error: "Gender is required.",
		})
		.min(1, {
			message: "Gender is required.",
		}),
	contact: z
		.string({
			required_error: "Contact is required.",
		})
		.min(1, {
			message: "Contact is required.",
		})
		.regex(
			/^\+63\d{8,10}$/,
			"Phone number must follow the format +65xxxxxxxxxx"
		),
	email: z
		.string({
			required_error: "Email is required.",
		})
		.min(1, {
			message: "Contact is required.",
		})
		.email({ message: "Invalid email address" }),
	homeAddress: z
		.string({
			required_error: "Home address is required.",
		})
		.min(1, {
			message: "Home address is required.",
		}),
	position: z
		.string({
			required_error: "Position is required.",
		})
		.min(1, {
			message: "Position is required.",
		}),
	department: z
		.string({
			required_error: "Department is required.",
		})
		.min(1, {
			message: "Department is required.",
		}),
	employeeNumber: z
		.string({
			required_error: "Employee number is required.",
		})
		.min(1, {
			message: "Employee number is required.",
		})
		.regex(/^\d{4}-\d{5}$/, { message: "Invalid employee number format." }),
	roles: z
		.array(
			z.string({
				required_error: "Roles is required.",
			})
		)
		.refine((value) => value.some((item) => item), {
			message: "Please select a role.",
		}),
	username: z
		.string({
			required_error: "Username is required.",
		})
		.min(1, {
			message: "Username is required.",
		}),
	password: z
		.string({
			required_error: "Password is required.",
		})
		.min(1, {
			message: "Password is required.",
		}),
	confirmPassword: z
		.string({
			required_error: "Confirm Password is required.",
		})
		.min(1, {
			message: "Confirm Password is required.",
		}),
});

export const SetUserStatusSchema = z.object({
	userId: z
		.string({
			required_error: "User id is required",
		})
		.min(1, {
			message: "User id is required.",
		}),
});

export const UpdateRoleSchema = z.object({
	userId: z
		.string({
			required_error: "User id is required",
		})
		.min(1, {
			message: "User id is required.",
		}),
	roles: z
		.array(
			z.string({
				required_error: "Roles is required.",
			})
		)
		.refine((value) => value.some((item) => item), {
			message: "Please select a role.",
		}),
});

export const ApprovedUserSchema = z.object({
	userId: z
		.string({
			required_error: "User id is required",
		})
		.min(1, {
			message: "User id is required.",
		}),
});

export const RegisterUserWithNoRoleSchema = CreateUserSchema.omit({
	roles: true,
});


export const GetUserDetailsSchema = z.object({
	userId: z
		.string({
			required_error: "User id is required",
		})
		.min(1, {
			message: "User id is required.",
		}),
});