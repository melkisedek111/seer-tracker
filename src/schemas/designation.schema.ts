import { z } from "zod";

export const AssignDesignationSchema = z.object({
    userId: z.string({
        required_error: "Employee is required"
    }),
    designation: z.string({
         required_error: "Designation is required"
    })
})