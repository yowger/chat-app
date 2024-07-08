// import { useCookies } from "react-cookie"
import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios/public"

// import useAuthContext from "@/features/auth/hooks/useAuthContext"

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
    // const { setAuth } = useAuthContext()
    // const [_cookies, setCookies] = useCookies(["is_logged_in"])

    const updateSession = useAuthStore.use.updateSession()

    return useMutation<LoginResponse, AxiosError, LoginData>({
        onSuccess: (data) => {
            updateSession(data.accessToken)
            // setCookies("is_logged_in", true, { path: "/" })

            // setAuth({
            //     accessToken: data.accessToken,
            //     isAuthenticated: true,
            // })
        },
        ...config,
        mutationFn: login,
    })
}
