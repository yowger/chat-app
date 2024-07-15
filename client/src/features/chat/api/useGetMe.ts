import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { Profile } from "../types/User"
import type { QueryConfig } from "@/lib/query"

export interface getMeResponse extends Profile {}

const fetchMe = async (axios: AxiosInstance): Promise<getMeResponse> => {
    const response = await axios.get("/api/users/me")

    return response.data
}

interface UseGetProfileOptions {
    config?: QueryConfig<getMeResponse>
}

export const useGetMe = (options: UseGetProfileOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useQuery<getMeResponse, Error>({
        queryKey: ["user", "me"],
        queryFn: () => fetchMe(axiosPrivate),
        ...config,
    })
}
