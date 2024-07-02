import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"

export type LoginData = {
    data: {
        email: string
        password: string
    }
}
export type LoginResponse = {
    accessToken: string
    message: string
}

export const login = ({ data }: LoginData): Promise<LoginResponse> => {
    return axiosPublic.post("/api/login", data, {
        withCredentials: true,
    })
}

type UseLoginOptions = {
    config?: MutateConfig<LoginResponse>
}
export const useLogin = ({ config }: UseLoginOptions = {}) => {
    const { setAuth } = useAuthContext()

    return useMutation<LoginResponse, AxiosError, LoginData>({
        onSuccess: (refreshAuthData) => {
            setAuth({ accessToken: refreshAuthData.accessToken })
        },
        ...config,
        mutationFn: login,
    })
}
