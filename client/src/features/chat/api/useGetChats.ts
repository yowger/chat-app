import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import { chatKey } from "./keys"

import type { AxiosInstance } from "axios"
import type { Chat } from "../types/Chat"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { Pagination, PaginationInput } from "../types/Pagination"

export interface FetchChatsResponse {
    chats: Chat[]
    pagination: Pagination
}

interface FetchChatsOptions {
    pagination: Partial<PaginationInput>
}

const fetchChats = async (
    axios: AxiosInstance,
    options: FetchChatsOptions
): Promise<FetchChatsResponse> => {
    const { pagination } = options
    const { page = 0, limit = 10 } = pagination

    const response = await axios.get("/api/chat", {
        params: {
            page,
            limit,
        },
    })

    return response.data
}

interface UseGetChatsOptions {
    config?: InfiniteQueryConfig<FetchChatsResponse>
}

export const useGetChats = (options: UseGetChatsOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<FetchChatsResponse, Error>({
        queryKey: [chatKey],
        queryFn: ({ pageParam = 1 }) => {
            const fetchChatsOptions: FetchChatsOptions = {
                pagination: {
                    page: pageParam as number,
                },
            }

            return fetchChats(axiosPrivate, fetchChatsOptions)
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: FetchChatsResponse) => {
            const currentPage = lastPage.pagination.page
            const totalPages = lastPage.pagination.totalPages
            const nextPage = currentPage + 1

            const hasNextPage = nextPage <= totalPages

            return hasNextPage ? nextPage : undefined
        },
        ...config,
    })
}
