import { z } from "zod"

export const GetPositionByIdSchema = z.object({
    positionId: z.string({
        required_error: "Position ID is required."
    }).min(1, {
        message: "Position ID is required.",
    }),
})

export const CreatePositionSchema = z.object({
    name: z.string({
        required_error: "Position name is required."
    }).min(1, {
        message: "Position name is required.",
    }),
})

export const UpdatePositionSchema = z.object({
    positionId: z.string({
        required_error: "Position ID is required."
    }).min(1, {
        message: "Position ID is required.",
    }),
    name: z.string({
        required_error: "Position name is required."
    }).min(1, {
        message: "Position name is required.",
    }),
})