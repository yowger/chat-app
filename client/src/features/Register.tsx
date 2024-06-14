import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

import googleIcon from "@/assets/svg/googleIcon.svg"

export default function Register() {
    return (
        <div className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex">
                        <div className="w-full p-6 space-y-6 md:space-y-6 sm:p-8 md:p-10 lg:p-12">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up
                            </h1>

                            <form className="space-y-6 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Username
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="username"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <Input
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

                                <div className="space-y-4">
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="w-full"
                                    >
                                        Create account
                                    </Button>

                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        <img
                                            src={googleIcon}
                                            className="mr-1.5"
                                        />
                                        Sign up with Google
                                    </Button>
                                </div>

                                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-primary hover:underline dark:text-primary"
                                    >
                                        Login now
                                    </a>
                                </p>
                            </form>
                        </div>

                        <div className="hidden md:flex w-full text-white bg-primary rounded-r-lg p-10 lg:p-12"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
