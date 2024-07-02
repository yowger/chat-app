import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema } from "../../schemas/login"

import { Button } from "@/components/ui/button/Button"
import { FormInput } from "@/components/forms/FormInput"
import Label from "@/components/ui/Label"

import type { FC } from "react"
import type { Login } from "../../schemas/login"

interface RegisterFormProps {
    onSuccess: (data: Login) => void
}

const LoginForm: FC<RegisterFormProps> = ({ onSuccess }) => {
    const { control, handleSubmit } = useForm<Login>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: Login) => {
        onSuccess(data)
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

                <Button type="submit" variant="default" className="w-full">
                    Sign in
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
