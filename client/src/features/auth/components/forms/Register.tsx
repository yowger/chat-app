import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const RegisterForm = () => {
    return (
        <form className="space-y-6 md:space-y-6" action="#">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                </label>
                <Input type="email" name="email" placeholder="username" />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <Input name="email" placeholder="email@company.com" />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <Input type="password" name="password" placeholder="••••••••" />
            </div>

            <Button type="submit" variant="default" className="w-full">
                Create account
            </Button>
        </form>
    )
}

export default RegisterForm
