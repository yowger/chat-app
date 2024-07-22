import { useMutation } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import { chatKey } from "./keys"

import type { AxiosError, AxiosInstance } from "axios"
import type { MutateConfig } from "@/lib/query"
import type { Chat } from "../types/Chat"

export interface CreateChatResponse extends Chat {}

interface CreateChatInput {
    name?: string
    participants: string[]
}

interface CreateChatOptions {
    input: CreateChatInput
}

const createChat = async (
    axios: AxiosInstance,
    options: CreateChatOptions
): Promise<CreateChatResponse> => {
    const { input } = options

    const response = await axios.post("/api/chat/", input)

    return response.data
}

interface UseCreateChatOptions {
    config?: MutateConfig<CreateChatResponse>
}

export const useCreateChat = (options: UseCreateChatOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useMutation<CreateChatResponse, AxiosError, CreateChatOptions>({
        mutationFn: (options: CreateChatOptions) => {
            const { input } = options

            return createChat(axiosPrivate, {
                input,
            })
        },
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: [chatKey],
                exact: true,
            })
        },
        onError: (_error, _chat, _context) => {
            // todo display alert notification error
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [chatKey], exact: true })
        },
        ...config,
    })
}
