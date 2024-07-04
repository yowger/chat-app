import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import useEndSession from "../hooks/useEndSession"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"

export interface RefreshAuthResponse {
    accessToken: string
}
export const refreshAuth = (): Promise<RefreshAuthResponse> => {
    return axiosPublic.post(
        "/api/refresh",
        {},
        {
            withCredentials: true,
        }
    )
}

interface UseRefreshAuthOptions {
    config?: MutateConfig<RefreshAuthResponse>
}
export const useRefreshAuth = ({ config }: UseRefreshAuthOptions = {}) => {
    const { setAuth } = useAuthContext()
    const endSession = useEndSession()

    return useMutation<RefreshAuthResponse, AxiosError>({
        onSuccess: (refreshAuthData) => {
            setAuth({
                accessToken: refreshAuthData.accessToken,
                isAuthenticated: true,
            })
        },
        onError: () => {
            endSession()
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
