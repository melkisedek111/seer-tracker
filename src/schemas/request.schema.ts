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

export const RequestFilesSchema = z
	.object({
		attachments: z
			.array(
				z.instanceof(File, {
					message: "Invalid file type",
				})
			)
			.optional(),
	})
	.superRefine((file, ctx) => {
		file.attachments?.forEach((file) => {
			if (file.size > MAX_FILE_SIZE) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["attachments"],
					message: "Max image size is 5MB.",
				});
			}
			if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["attachments"],
					message:
						"Only .jpg, .jpeg, .png, .webp, .docx, .pdf and .txt formats are supported.",
				});
			}
		});
	});

export const BAGSRequestSchema = z
	.object({
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
		services: z
			.array(z.string())
			.refine((value) => value.some((item) => item), {
				message: "You have to select at least one item.",
			}),
		otherService: z.string().optional(),
		problemDetails: z
			.string({
				required_error: "Problem details is required.",
			})
			.min(2, {
				message: "Problem details is required.",
			}),
		priorityLevel: z
			.string({
				required_error: "Problem details is required.",
			})
			.min(2, {
				message: "Problem details is required.",
			}),
	})
	.superRefine((data, ctx) => {
		// If the checkbox is checked, make inputField required
		if (
			data.services.some((item) => item === "Others") &&
			!data?.otherService?.trim()
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["otherService"], // Target the inputField for the error
				message: "This field is required when the checkbox is checked",
			});
		}
	});

export const MISRequestSchema = z
	.object({
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
		problemType: z
			.string({
				required_error: "Problem type is required.",
			})
			.min(2, {
				message: "Problem type is require.d",
			}),
		otherProblem: z.string().optional(),
		problemDetails: z
			.string({
				required_error: "Problem details is required.",
			})
			.min(2, {
				message: "Problem details is required.",
			}),
		priorityLevel: z
			.string({
				required_error: "Problem details is required.",
			})
			.min(2, {
				message: "Problem details is required.",
			}),
	})
	.superRefine((data, ctx) => {
		// If the checkbox is checked, make inputField required
		if (data.problemType === "Others" && !data?.otherProblem?.trim()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["otherProblem"], // Target the inputField for the error
				message: "Please specify the others.",
			});
		}
	});
