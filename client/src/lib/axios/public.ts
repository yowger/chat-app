import Axios from "axios"

import { API_URL } from "@/config/env"

import type { AxiosError, AxiosInstance } from "axios"

export const axiosPublic: AxiosInstance = Axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
})

axiosPublic.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)
