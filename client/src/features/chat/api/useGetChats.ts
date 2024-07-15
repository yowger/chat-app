import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { ChatType } from "../types/Chat"
import type { ChatUser } from "../types/User"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { Pagination, PaginationInput } from "../types/Pagination"

export interface Chat {
    _id: string
    type: ChatType
    participants: ChatUser[]
    groupName: string
    groupAdmin: ChatUser
    createdAt: Date
    latestMessage?: {
        _id: string
        content: string
        sender: ChatUser
        createdAt: Date
    }
}

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
    const axiosPrivate = useAxiosPrivate()

    const { config } = options

    return useInfiniteQuery<FetchChatsResponse, Error>({
        queryKey: ["chats"],
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
