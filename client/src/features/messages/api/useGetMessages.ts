import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { ChatId } from "../types/Chat"
import type { ChatUser } from "../types/User"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { Pagination, PaginationInput } from "../types/Pagination"

interface Message {
    _id: string
    content: string
    chat: string
    sender: ChatUser
    readAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export interface getMessagesResponse {
    messages: Message[]
    pagination: Pagination
}

interface getMessagesOptions {
    query: {
        chatId: ChatId
        content?: string
    }
    pagination: Partial<PaginationInput>
}

const fetchMessages = async (
    axios: AxiosInstance,
    options: getMessagesOptions
): Promise<getMessagesResponse> => {
    const { query, pagination } = options
    const { chatId, content } = query
    const { page = 0, limit = 10 } = pagination

    const response = await axios.get("/api/message", {
        params: {
            chatId,
            content,
            page,
            limit,
        },
    })

    return response.data
}

interface UseSearchUsersOptions {
    query: {
        chatId: ChatId
        content?: string
    }
    config?: InfiniteQueryConfig<getMessagesResponse>
}

export const useGetMessages = (options: UseSearchUsersOptions) => {
    const { query, config } = options
    const { chatId, content } = query

    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<getMessagesResponse, Error>({
        queryKey: ["messages", chatId, content],
        queryFn: ({ pageParam = 1 }) => {
            const fetchMessagesOptions: getMessagesOptions = {
                query: {
                    chatId,
                    content,
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
        enabled: !!chatId,
        ...config,
    })
}
