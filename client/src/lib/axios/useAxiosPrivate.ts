import { useEffect } from "react"

import { axiosPrivate } from "@/lib/axios/private"

import { useRefreshAuth } from "@/features/auth/api/useRefreshAuth"

import useAuthStore from "@/features/auth/store/auth"

import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const useAxiosPrivate = (): AxiosInstance => {
    const { accessToken } = useAuthStore.use.auth()
    const refreshAuthMutation = useRefreshAuth()

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => {
                return response
            },
            async (error: AxiosError) => {
                const getNewAccessToken = async () => {
                    const originalRequest =
                        error.config as CustomAxiosRequestConfig

                    const shouldRetryOriginalRequest =
                        error.response?.status === 401 &&
                        originalRequest &&
                        !originalRequest._retry

                    if (shouldRetryOriginalRequest) {
                        try {
                            originalRequest._retry = true

                            const { accessToken } =
                                await refreshAuthMutation.mutateAsync()

                            originalRequest.headers.Authorization = `Bearer ${accessToken}`

                            return axiosPrivate(originalRequest)
                        } catch (error) {
                            return Promise.reject(error)
                        }
                    }

                    return Promise.reject(error)
                }

                getNewAccessToken()
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [accessToken, refreshAuthMutation])

    return axiosPrivate
}

export default useAxiosPrivate
