import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import useAuthStore from "../store/auth"

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
    const clearSession = useAuthStore.use.clearSession()

    return useMutation<LogoutResponse, AxiosError>({
        onSuccess: () => {
            clearSession()
        },
        ...config,
        mutationFn: logout,
    })
}
