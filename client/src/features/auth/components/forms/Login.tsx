import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/Input"

const LoginForm = () => {
    return (
        <form action="#">
            <div className="space-y-6 md:space-y-6">
                <div>
                    <Input
                        type="email"
                        name="email"
                        placeholder="email@company.com"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
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
