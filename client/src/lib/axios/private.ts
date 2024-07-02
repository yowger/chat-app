import Axios from "axios"

import { API_URL } from "@/config/env"

import type { AxiosInstance, AxiosError } from "axios"

export const axiosPrivate: AxiosInstance = Axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
})

axiosPrivate.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)
