import { useEffect } from "react"

import { axiosPrivate } from "@/lib/axios/private"

import { useRefreshAuth } from "@/features/auth/api/useRefreshAuth"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import type { AxiosInstance } from "axios"

const useAxiosPrivate = (): AxiosInstance => {
    const { auth } = useAuthContext()
    const refreshAuthMutation = useRefreshAuth()

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers.Authorization = `Bearer ${auth.accessToken}`
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
            async (error) => {
                const getNewAccessToken = async () => {
                    const originalRequest = error.config

                    if (
                        error.response &&
                        error.response.status === 403 &&
                        !refreshAuthMutation.isPending
                    ) {
                        try {
                            const newAccessToken = await new Promise(
                                (resolve, reject) => {
                                    refreshAuthMutation.mutate(undefined, {
                                        onSuccess: (data) => {
                                            resolve(data.accessToken)
                                        },
                                        onError: (error) => {
                                            reject(error)
                                        },
                                    })
                                }
                            )

                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                            return axiosPrivate(originalRequest)
                        } catch (refreshError) {
                            return Promise.reject(refreshError)
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
    }, [auth.accessToken, refreshAuthMutation])

    return axiosPrivate
}

export default useAxiosPrivate
