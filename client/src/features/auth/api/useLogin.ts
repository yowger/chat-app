import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/query"
import useAuthStore from "../store/auth"

export interface LoginData {
    data: {
        email: string
        password: string
    }
}
export interface LoginResponse {
    accessToken: string
}

export const login = ({ data }: LoginData): Promise<LoginResponse> => {
    return axiosPublic.post("/api/login", data, {
        withCredentials: true,
    })
}

interface UseLoginOptions {
    config?: MutateConfig<LoginResponse>
}

export const useLogin = ({ config }: UseLoginOptions = {}) => {
    const updateSession = useAuthStore.use.updateSession()

    return useMutation<LoginResponse, AxiosError, LoginData>({
        onSuccess: (data) => {
            updateSession(data.accessToken)
        },
        ...config,
        mutationFn: login,
    })
}
