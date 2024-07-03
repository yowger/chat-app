import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"

export type RefreshAuthResponse = {
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

type UseRefreshAuthOptions = {
    config?: MutateConfig<RefreshAuthResponse>
}
export const useRefreshAuth = ({ config }: UseRefreshAuthOptions = {}) => {
    const { setAuth } = useAuthContext()

    return useMutation<RefreshAuthResponse, AxiosError>({
        onSuccess: (refreshAuthData) => {
            setAuth({
                accessToken: refreshAuthData.accessToken,
                isAuthenticated: true,
            })
        },
        onError: () => {
            setAuth({ accessToken: "", isAuthenticated: false })
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
