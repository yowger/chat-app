import { Link, useLocation } from "react-router-dom"

import Label from "@/components/ui/Label"
import LoginForm from "../components/forms/Login"
import { API_URL } from "@/config/env"

// import { Button } from "@/components/ui/Button"
// import googleIcon from "@/assets/svg/googleIcon.svg"

export default function Login() {
    const location = useLocation()
    const message = location.state?.message

    const envEntries = Object.entries(import.meta.env)

    return (
        <div className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex">
                        <div className="w-full p-6 space-y-6 md:space-y-6 sm:p-8 md:p-10 lg:p-12">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>

                            {message && (
                                <Label
                                    className={
                                        message.type === "success"
                                            ? "text-green-700"
                                            : "text-red-700"
                                    }
                                >
                                    {message.text}
                                </Label>
                            )}

                            {/* <Button className="w-full" variant="outline">
                                <img src={googleIcon} className="mr-1.5" />
                                Log in with Google
                            </Button> */}

                            {/* <p className="line-text text-center text-gray-500 dark:text-gray-400">
                                or
                            </p> */}

                            <LoginForm />

                            {/* test */}
                            <ul>
                                {envEntries.map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                            {/* test */}
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link
                                    to="/register"
                                    className="font-medium text-primary hover:underline dark:text-primary"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <div className="hidden md:flex w-full text-white bg-primary rounded-r-lg p-10 lg:p-12"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
