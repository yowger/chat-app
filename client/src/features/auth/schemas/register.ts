import { z } from "zod"

export const registerSchema = z
    .object({
        username: z.string().min(2, "Username must be at least 2 characters"),
        email: z
            .string()
            .min(1, {
                message: "Email must not be empty",
            })
            .email("Email must be a valid email."),
        password: z
            .string()
            .min(5, { message: "Password must be at least 5 characters long" })
            .regex(
                /^(?=.*[A-Z])(?=.*[0-9]).+$/,
                "Password must contain at least one uppercase letter and one number"
            ),
        confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Password does not match",
                path: ["confirmPassword"],
            })
        }
    })

export type Register = z.infer<typeof registerSchema>
