import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import { messageKey } from "./keys"

import type { AxiosInstance } from "axios"
import type { ChatId } from "@/features/chat/types/Chat"
import type { InfiniteQueryConfig } from "@/lib/query"
import { Pagination, PaginationInput } from "@/features/chat/types/Pagination"
import type { Recipient } from "@/features/chat/types/User"

export interface Message {
    _id: string
    content: string
    chat: string
    sender: Recipient
    readAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export interface GetMessagesResponse {
    messages: Message[]
    pagination: Pagination
}

interface GetMessagesOptions {
    query: {
        chatId: ChatId
        content?: string
    }
    pagination: Partial<PaginationInput>
}

const fetchMessages = async (
    axios: AxiosInstance,
    options: GetMessagesOptions
): Promise<GetMessagesResponse> => {
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
    config?: InfiniteQueryConfig<GetMessagesResponse>
}

export const useGetMessages = (options: UseSearchUsersOptions) => {
    const { query, config } = options
    const { chatId, content } = query

    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<GetMessagesResponse, Error>({
        queryKey: [messageKey, chatId],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => {
            const fetchMessagesOptions: GetMessagesOptions = {
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
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        }),
        getNextPageParam: (lastPage: GetMessagesResponse) => {
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
