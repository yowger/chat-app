import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { User } from "../types/User"
import type { QueryConfig } from "@/lib/query"

export interface GetMeResponse extends User {}

const fetchMe = async (axios: AxiosInstance): Promise<GetMeResponse> => {
    const response = await axios.get("/api/user/me")

    return response.data
}

interface UseGetProfileOptions {
    config?: QueryConfig<GetMeResponse>
}

export const useGetMe = (options: UseGetProfileOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useQuery<GetMeResponse, Error>({
        queryKey: ["user", "me"],
        queryFn: () => fetchMe(axiosPrivate),
        ...config,
    })
}
