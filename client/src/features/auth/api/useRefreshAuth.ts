import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

// import useAuthContext from "@/features/auth/hooks/useAuthContext"

// import useEndSession from "../hooks/useEndSession"

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
    // const { setAuth } = useAuthContext()
    const updateSession = useAuthStore.use.updateSession()
    const clearSession = useAuthStore.use.clearSession()
    // const endSession = useEndSession()

    return useMutation<RefreshAuthResponse, AxiosError>({
        onSuccess: (data) => {
            // setAuth({
            //     accessToken: refreshAuthData.accessToken,
            //     isAuthenticated: true,
            // })
            console.log("session updated")
            updateSession(data.accessToken)
        },
        onError: () => {
            // endSession()
            console.log("error")
            clearSession()
            // console.log("session denied")
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
