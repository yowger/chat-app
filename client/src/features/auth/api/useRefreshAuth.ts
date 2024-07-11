import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"
import useAuthStore from "../store/auth"

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
    const updateSession = useAuthStore.use.updateSession()
    const clearSession = useAuthStore.use.clearSession()

    return useMutation<RefreshAuthResponse, AxiosError>({
        onSuccess: (data) => {
            updateSession(data.accessToken)
        },
        onError: () => {
            clearSession()
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
