import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { registerSchema } from "../../schemas/register"

import { Button } from "@/components/ui/button/Button"
import { FormInput } from "@/components/forms/FormInput"
import Label from "@/components/ui/Label"

import type { FC } from "react"
import type { Register } from "../../schemas/register"

interface RegisterFormProps {
    onSuccess: (data: Register) => void
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
    const { control, handleSubmit } = useForm<Register>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: Register) => {
        onSuccess(data)
    }

    return (
        <form
            className="space-y-6 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <Label>Username</Label>
                <FormInput
                    name="username"
                    control={control}
                    placeholder="username"
                />
            </div>

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
            <div>
                <Label>Confirm Pasword</Label>
                <FormInput
                    type="password"
                    name="confirmPassword"
                    control={control}
                    placeholder="•••••"
                />
            </div>

            <Button type="submit" variant="default" className="w-full">
                Create account
            </Button>
        </form>
    )
}

export default RegisterForm
