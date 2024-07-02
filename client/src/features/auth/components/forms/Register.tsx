import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { registerSchema } from "../../schemas/register"

import { Button } from "@/components/ui/button/Button"
import { FormInput } from "@/components/forms/FormInput"
import ErrorLabel from "@/components/forms/ErrorLabel"
import Label from "@/components/ui/Label"

import { useRegister } from "../../api/useRegister"

import type { FC } from "react"
import type { Register } from "../../schemas/register"

interface RegisterFormProps {
    onSuccess: (data: Register) => void
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
    const { mutate, isPending } = useRegister()
    const [errorMessage, setErrorMessage] = useState("")

    const { control, handleSubmit, setFocus } = useForm<Register>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (formData: Register) => {
        mutate(
            { data: formData },
            {
                onSuccess: () => {
                    onSuccess(formData)
                    setErrorMessage("")
                },
                onError: (error) => {
                    const status = error.response?.status

                    switch (status) {
                        case 409:
                            setFocus("email")
                            setErrorMessage(
                                "Email address already in use. Please try a different email."
                            )
                            break
                        default:
                            setErrorMessage(
                                "An unexpected error occurred. Please try again later."
                            )
                    }
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 md:space-y-6">
                <div>
                    <Label>Username</Label>
                    <FormInput
                        name="username"
                        control={control}
                        placeholder="username"
                        aria-label="username"
                    />
                </div>

                <div>
                    <Label>Email</Label>
                    <FormInput
                        name="email"
                        control={control}
                        placeholder="email@company.com"
                        aria-label="email"
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <FormInput
                        type="password"
                        name="password"
                        control={control}
                        placeholder="•••••"
                        aria-label="password"
                    />
                </div>
                <div>
                    <Label>Confirm Pasword</Label>
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        control={control}
                        placeholder="•••••"
                        aria-label="confirm password"
                    />
                </div>

                {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}

                <Button
                    type="submit"
                    variant="default"
                    disabled={isPending}
                    className="w-full"
                >
                    Create account
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm
