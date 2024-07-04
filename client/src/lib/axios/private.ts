import Axios from "axios"

import { API_URL } from "@/config/env"

import type { AxiosInstance } from "axios"

export const axiosPrivate: AxiosInstance = Axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
})
