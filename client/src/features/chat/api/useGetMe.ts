import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { Profile } from "../types/User"
import type { QueryConfig } from "@/lib/query"

import type { AxiosInstance } from "axios"

export interface getMeResponse extends Profile {}

const fetchMe = async (axios: AxiosInstance): Promise<getMeResponse> => {
    const response = await axios.get("/api/users/me")

    return response.data
}

interface UseGetProfileOptions {
    config?: QueryConfig<getMeResponse>
}

export const useGetMe = (options: UseGetProfileOptions = {}) => {
    const axiosPrivate = useAxiosPrivate()

    const { config } = options

    return useQuery<getMeResponse, Error>({
        queryKey: ["user", "me"],
        queryFn: () => fetchMe(axiosPrivate),
        ...config,
    })
}
