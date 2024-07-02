import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "Email must not be empty",
        })
        .email("Email must be a valid email."),

    password: z.string(),
})

export type Login = z.infer<typeof loginSchema>
