import { produce } from "immer"

import { InfiniteData, useMutation } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import useUserStore from "@/features/auth/store/user"

import { messageKey } from "./keys"

import type { AxiosError, AxiosInstance } from "axios"
import type { GetMessagesResponse } from "./useGetMessages"
import type { MutateConfig } from "@/lib/query"

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
            const chatId = options.input.chatId

            await queryClient.cancelQueries({
                queryKey: [messageKey, chatId],
                exact: true,
            })

            const previousMessages =
                queryClient.getQueryData<GetMessagesResponse>([messageKey])

            queryClient.setQueryData<InfiniteData<GetMessagesResponse>>(
                [messageKey, chatId],
                produce((draft) => {
                    if (!draft) return

                    if (draft.pages.length > 0) {
                        const tempId = Date.now().toString()
                        const chatId = options.input.chatId
                        const content = options.input.content

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

            return { previousMessages }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (_error, options, context: any) => {
            const previousMessages = context?.previousMessages

            if (previousMessages) {
                const chatId = options.input.chatId

                queryClient.setQueryData(
                    [messageKey, chatId],
                    context.previousMessages
                )
            }

            // todo display alert notification error
        },
        onSettled: (data) => {
            const chatId = data?.chat

            queryClient.invalidateQueries({
                queryKey: [messageKey, chatId],
                exact: true,
            })
        },
        ...config,
    })
}
