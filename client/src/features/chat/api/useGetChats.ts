import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { ChatType } from "../types/Chat"
import type { ChatUser } from "../types/User"

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

export interface Pagination {
    page: number
    limit: number
    totalPages: number
    totalMessages: number
}

export interface FetchChatsResponse {
    chats: Chat[]
    pagination: Pagination
}

interface FetchChatsOptions {
    pagination: {
        page?: number
        limit?: number
    }
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

interface UseSearchUsersOptions {
    config?: InfiniteQueryConfig<FetchChatsResponse>
}

export const useGetChats = (options: UseSearchUsersOptions = {}) => {
    const { config } = options
    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<FetchChatsResponse, Error>({
        queryKey: ["users", "search"],
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
            const nextPage = lastPage.pagination.page + 1
            return nextPage <= lastPage.pagination.totalPages
                ? nextPage
                : undefined
        },
        ...config,
    })
}
