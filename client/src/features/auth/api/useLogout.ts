import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"

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
    const { setAuth } = useAuthContext()

    return useMutation<LogoutResponse, AxiosError>({
        onSuccess: () => {
            setAuth({
                accessToken: "",
                isAuthenticated: false,
            })
        },
        ...config,
        mutationFn: logout,
    })
}
