import { produce } from "immer"

import { InfiniteData, useMutation } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import useUserStore from "@/features/auth/store/user"

import { messageKey } from "./keys"

import type { AxiosError, AxiosInstance } from "axios"
import type { GetMessagesResponse } from "./useGetMessages"
import type { MutateConfig } from "@/lib/query"
import { chatKey } from "@/features/chat/api/keys"
import { GetChatsResponse } from "@/features/chat/api/useGetChats"

export interface SendMessageResponse {
    chat: string
    content: string
    createdAt: Date
    readAt: string[]
    sender: string[]
    updatedAt: Date
    _id: string
}

interface SendMessageInput {
    chatId: string
    content: string
}

interface SendMessageOptions {
    input: SendMessageInput
}

const sendMessage = async (
    axios: AxiosInstance,
    options: SendMessageOptions
): Promise<SendMessageResponse> => {
    const { input } = options

    const response = await axios.post("/api/message/", input)

    return response.data
}

interface UseSendMessageOptions {
    config?: MutateConfig<SendMessageResponse>
}

export const useSendMessage = (options: UseSendMessageOptions = {}) => {
    const { config } = options
    const user = useUserStore.use.user()

    const axiosPrivate = useAxiosPrivate()

    return useMutation<SendMessageResponse, AxiosError, SendMessageOptions>({
        mutationFn: (options: SendMessageOptions) => {
            const { input } = options

            return sendMessage(axiosPrivate, {
                input,
            })
        },
        onMutate: async (options) => {
            const { chatId, content } = options.input

            await queryClient.cancelQueries({
                queryKey: [messageKey, chatId],
                exact: true,
            })
            await queryClient.cancelQueries({
                queryKey: [chatKey],
                exact: true,
            })

            const previousMessages =
                queryClient.getQueryData<GetMessagesResponse>([
                    messageKey,
                    chatId,
                ])

            queryClient.setQueryData<InfiniteData<GetMessagesResponse>>(
                [messageKey, chatId],
                produce((draft) => {
                    if (!draft) return

                    if (draft.pages.length > 0) {
                        const tempId = Date.now().toString()

                        const newMessage = {
                            _id: tempId,
                            chat: chatId,
                            content,
                            sender: {
                                _id: user!._id,
                                username: user!.username,
                            },
                            readAt: null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }

                        draft.pages[0].messages.push(newMessage)
                    }
                })
            )

            const previousChats = queryClient.getQueryData<GetChatsResponse>([
                chatKey,
            ])

            queryClient.setQueryData<InfiniteData<GetChatsResponse>>(
                [chatKey],
                produce((draft) => {
                    if (!draft) return

                    draft.pages.forEach((page) => {
                        const chatIndex = page.chats.findIndex(
                            (chat) => chat._id === chatId
                        )

                        if (chatIndex !== -1) {
                            page.chats[chatIndex].latestMessage = {
                                _id: Date.now().toString(),
                                content,
                                sender: {
                                    _id: user!._id,
                                    username: user!.username,
                                },
                                createdAt: new Date(),
                            }

                            // Move updated chat to top
                            const updatedChat = page.chats.splice(
                                chatIndex,
                                1
                            )[0]
                            page.chats.unshift(updatedChat)
                        }
                    })
                })
            )

            return { previousMessages, previousChats }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (_error, options, context: any) => {
            const previousMessages = context?.previousMessages
            const previousChats = context?.previousChats

            if (previousMessages) {
                const chatId = options.input.chatId

                queryClient.setQueryData([messageKey, chatId], previousMessages)
            }

            if (previousChats) {
                queryClient.setQueryData([chatKey], previousChats)
            }

            // todo display alert notification error
        },
        onSettled: (data) => {
            const chatId = data?.chat

            queryClient.invalidateQueries({
                queryKey: [messageKey, chatId],
                exact: true,
            })
            queryClient.invalidateQueries({
                queryKey: [chatKey],
                exact: true,
            })
        },
        ...config,
    })
}
