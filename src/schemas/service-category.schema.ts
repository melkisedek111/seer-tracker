import { z } from "zod"

export const CreateServiceCategorySchema = z.object({
    initials: z.string({
        required_error: "Service category initials is required."
    }).min(1, {
        message: "Service category initials is required.",
    }),
    name: z.string({
        required_error: "Service category name is required."
    }).min(1, {
        message: "Service category name is required.",
    }),
})