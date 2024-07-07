import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/hooks/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { Profile } from "../types/User"
import type { QueryConfig } from "@/lib/query"

type SearchedUsers = Pick<Profile, "_id" | "username">

export interface SearchUsersResponse {
    currentPage: number
    totalPages: number
    totalUsers: number
    users: SearchedUsers[]
}

interface UseSearchUsersOptions {
    config?: QueryConfig<SearchUsersResponse>
}

const fetchUsers = async (
    axios: AxiosInstance,
    username: string
): Promise<SearchUsersResponse> => {
    const response = await axios.get("/api/users/search", {
        params: {
            query: username,
        },
    })

    return response.data
}

export const useSearchUsers = (
    username: string,
    { config }: UseSearchUsersOptions = {}
) => {
    const axiosPrivate = useAxiosPrivate()

    return useQuery<SearchUsersResponse, Error>({
        queryKey: ["users", "search", username],
        queryFn: () => fetchUsers(axiosPrivate, username),
        enabled: !!username,
        ...config,
    })
}
