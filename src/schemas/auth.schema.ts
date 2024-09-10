import { z } from "zod";

export const SignInFormSchema = z.object({
	username: z
		.string({
			required_error: "Username, Email, Employee number is required.",
		})
		.min(1, {
			message: "Username, Email, Employee number is required.",
		}),
	password: z
		.string({
			required_error: "Password is requried.",
		})
		.min(1, {
			message: "Password is required.",
		}),
});
