import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/hooks/useAxiosPrivate"

import type { Profile } from "../types/User"
import type { QueryConfig } from "@/lib/query"

import type { AxiosInstance } from "axios"

export interface getMeResponse extends Profile {}

interface UseGetProfileOptions {
    config?: QueryConfig<getMeResponse>
}

const fetchMe = async (axios: AxiosInstance): Promise<getMeResponse> => {
    const response = await axios.get("/api/users/me")

    return response.data
}

export const useGetMe = ({ config }: UseGetProfileOptions = {}) => {
    const axiosPrivate = useAxiosPrivate()

    return useQuery<getMeResponse, Error>({
        queryKey: ["profile", "me"],
        queryFn: () => fetchMe(axiosPrivate),
        ...config,
    })
}
