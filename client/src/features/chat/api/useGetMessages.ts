import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { Pagination, PaginationInput } from "../types/Pagination"
import type { Profile } from "../types/User"

type SearchedUsers = Pick<Profile, "_id" | "username">

export interface getMessagesResponse {
    users: SearchedUsers[]
    pagination: Pagination
}

interface getMessagesOptions {
    query: {
        username: string
    }
    pagination: Partial<PaginationInput>
}

const fetchMessages = async (
    axios: AxiosInstance,
    options: getMessagesOptions
): Promise<getMessagesResponse> => {
    const { query, pagination } = options
    const { username } = query
    const { page = 0, limit = 10 } = pagination
    const response = await axios.get("/api/user", {
        params: {
            username,
            page,
            limit,
        },
    })

    return response.data
}

interface UseSearchUsersOptions {
    searchParams: {
        username: string
    }
    config?: InfiniteQueryConfig<getMessagesResponse>
}

export const useSearchUsers = ({
    searchParams,
    config,
}: UseSearchUsersOptions) => {
    const axiosPrivate = useAxiosPrivate()

    const { username } = searchParams

    return useInfiniteQuery<getMessagesResponse, Error>({
        queryKey: ["messages", "search", username],
        queryFn: ({ pageParam = 1 }) => {
            const fetchMessagesOptions: getMessagesOptions = {
                query: {
                    username,
                },
                pagination: {
                    page: pageParam as number,
                },
            }

            return fetchMessages(axiosPrivate, fetchMessagesOptions)
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: getMessagesResponse) => {
            const currentPage = lastPage.pagination.page
            const totalPages = lastPage.pagination.totalPages
            const nextPage = currentPage + 1

            const hasNextPage = nextPage <= totalPages

            return hasNextPage ? nextPage : undefined
        },
        ...config,
    })
}
