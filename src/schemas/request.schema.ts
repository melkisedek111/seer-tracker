import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"text/plain",
];
const MIN_FILES_COUNT = 5; // Minimum number of files required

export const RequestFilesSchema = z.object({
	attachments: z
		.array(
			z.instanceof(File, {
				message: "Invalid file type",
			})
		)
		.optional(),
});
// .superRefine((file, ctx) => {
// 	file.attachments?.forEach((file) => {
// 		if (file.size > MAX_FILE_SIZE) {
// 			ctx.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				path: ["attachments"],
// 				message: "Max image size is 5MB.",
// 			});
// 		}
// 		if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
// 			ctx.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				path: ["attachments"],
// 				message:
// 					"Only .jpg, .jpeg, .png, .webp, .docx, .pdf and .txt formats are supported.",
// 			});
// 		}
// 	});
// });

export const BAGSRequestSchema = z.object({
	serviceCategory: z
		.string({
			required_error: "Service category is required.",
		})
		.min(2, {
			message: "Service category is required.",
		}),
	title: z
		.string({
			required_error: "Service category is required.",
		})
		.max(50, {
			message: "Title should be exceed to 50 characters.",
		}),
	services: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
	otherService: z.string().optional(),
	problemDetails: z.array(
		z.any({
			required_error: "Problem details is required.",
		}),
		{ message: "Problem details is required." }
	),
	priorityLevel: z
		.string({
			required_error: "Problem details is required.",
		})
		.min(2, {
			message: "Problem details is required.",
		}),
});

export const MISRequestSchema = z.object({
	serviceCategory: z
		.string({
			required_error: "Service category is required.",
		})
		.min(1, {
			message: "Service category is required.",
		}),
	title: z
		.string({
			required_error: "Title is required.",
		})
		.min(1, {
			message: "Title is required.",
		})
		.max(50, {
			message: "Title should be exceed to 50 characters.",
		}),
	problemType: z
		.string({
			required_error: "Problem type is required.",
		})
		.min(2, {
			message: "Problem type is required.",
		}),
	otherProblem: z.string().max(30, {
		message: "Other problem should be exceed to 30 characters.",
	}).optional(),
	problemDetails: z.array(
		z.any({
			required_error: "Problem details is required.",
		}),
		{ message: "Problem details is required." }
	),
	priorityLevel: z
		.string({
			required_error: "Problem details is required.",
		})
		.min(2, {
			message: "Problem details is required.",
		}),
});

export const CreateMISRequestSchema = z.object({
	requestDetails: MISRequestSchema.or(BAGSRequestSchema),
});
