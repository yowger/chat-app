import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema } from "../../schemas/login"

import { Button } from "@/components/ui/button/Button"
import { FormInput } from "@/components/forms/FormInput"
import ErrorLabel from "@/components/forms/ErrorLabel"
import Label from "@/components/ui/Label"

import { useLogin } from "../../api/useLogin"

import type { FC } from "react"
import type { Login } from "../../schemas/login"

interface RegisterFormProps {
    onSuccess: (data: Login) => void
}

const LoginForm: FC<RegisterFormProps> = ({ onSuccess }) => {
    const { mutate, isPending } = useLogin()
    const [errorMessage, setErrorMessage] = useState("")

    const { control, handleSubmit, setFocus } = useForm<Login>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: Login) => {
        mutate(
            {
                data: {
                    email: data.email,
                    password: data.password,
                },
            },
            {
                onSuccess: () => {
                    onSuccess(data)
                },
                onError: (error) => {
                    const status = error.response?.status

                    switch (status) {
                        case 401:
                            setFocus("email")
                            setErrorMessage("Incorrect login credentials")
                            break
                        case 404:
                            setFocus("email")
                            setErrorMessage(
                                "The email address you entered is not registered."
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
                    <Label>Email</Label>
                    <FormInput
                        name="email"
                        control={control}
                        placeholder="email@company.com"
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <FormInput
                        type="password"
                        name="password"
                        control={control}
                        placeholder="•••••"
                    />
                </div>

                {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full"
                    disabled={isPending}
                >
                    Sign in
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
