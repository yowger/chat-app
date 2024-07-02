import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useRefreshAuth } from "@/features/auth/api/useRefreshAuth"

export default function PersistAuth() {
    const location = useLocation()
    const { mutate, isPending, isError, error, isSuccess } = useRefreshAuth()

    useEffect(() => {
        mutate()
    }, [mutate])

    if (isError) {
        let errorMessage = "An unknown error occurred. Please try again."

        if (error?.response?.status === 401) {
            errorMessage = "Your session has expired. Please log in again."
        } else if (error?.response?.status === 403) {
            errorMessage = "You do not have permission to view this page."
        } else if (error?.response?.status === 500) {
            errorMessage = "Internal server error. Please try again later."
        } else if (error?.message === "Network Error") {
            errorMessage =
                "Network error. Please check your internet connection."
        }

        return (
            <Navigate
                to="/auth/login"
                state={{
                    from: location,
                    message: errorMessage,
                }}
                replace
            />
        )
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isSuccess) {
        return <Outlet />
    }
}
