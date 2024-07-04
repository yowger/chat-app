import { useCookies } from "react-cookie"
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
    /* tslint:disable:no-unused-variable */
    const [_cookies, _setCookies, removeCookie] = useCookies(["is_logged_in"])

    return useMutation<LogoutResponse, AxiosError>({
        onSuccess: () => {
            removeCookie("is_logged_in")

            setAuth({
                accessToken: "",
                isAuthenticated: false,
            })
        },
        ...config,
        mutationFn: logout,
    })
}
