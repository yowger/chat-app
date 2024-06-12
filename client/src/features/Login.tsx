import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

import googleIcon from "@/assets/svg/googleIcon.svg"

export default function Login() {
    return (
        <div className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex">
                        <div className="w-full p-6 space-y-6 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>

                            <Button className="w-full" variant="outline">
                                <img src={googleIcon} className="mr-1.5" />
                                Log in with Google
                            </Button>

                            <p className="line-text text-center text-gray-500 dark:text-gray-400">
                                or
                            </p>

                            <form className="space-y-6 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
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

                                <Button
                                    type="submit"
                                    variant="default"
                                    className="w-full"
                                >
                                    Sign in
                                </Button>

                                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-primary hover:underline dark:text-primary"
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>

                        <div className="hidden md:flex w-full text-white p-6 bg-primary rounded-r-lg">
                            a
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
