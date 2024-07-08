import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

// import useEndSession from "../hooks/useEndSession"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"
import useAuthStore from "../store/auth"
import { useEffect } from "react"

export type LogoutResponse = {
    message: string
}

export const logout = (): Promise<LogoutResponse> => {
    return axiosPublic.post(
        "/api/logout",
        {},
        {
            withCredentials: true,
        }
    )
}

type UseLogoutOptions = {
    config?: MutateConfig<LogoutResponse>
}

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
    // const endSession = useEndSession()

    const auth = useAuthStore.use.auth()
    const clearSession = useAuthStore.use.clearSession()

    useEffect(() => {
        console.log("new auth: ", auth)
    }, [auth])

    return useMutation<LogoutResponse, AxiosError>({
        onSuccess: () => {
            // endSession()
            console.log("session clear")
            clearSession()
        },
        ...config,
        mutationFn: logout,
    })
}
