import { useMutation } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosError, AxiosInstance } from "axios"
import type { Chat } from "../types/Chat"
import type { MutateConfig } from "@/lib/query"

interface FetchChatInput {
    participants: string[]
}

export interface FetchChatsByParticipantsResponse extends Chat {}

interface FetchChatsByParticipantsOptions {
    input: FetchChatInput
}

const fetchChatsByParticipants = async (
    axios: AxiosInstance,
    options: FetchChatsByParticipantsOptions
): Promise<FetchChatsByParticipantsResponse> => {
    const { input } = options

    const response = await axios.post("/api/chat/find", input)

    return response.data
}

interface UseFindChatsOptions {
    config?: MutateConfig<FetchChatsByParticipantsResponse>
}

export const useFindChat = (options: UseFindChatsOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useMutation<
        FetchChatsByParticipantsResponse,
        AxiosError,
        FetchChatsByParticipantsOptions
    >({
        mutationFn: (options: FetchChatsByParticipantsOptions) => {
            const { input } = options

            return fetchChatsByParticipants(axiosPrivate, { input })
        },
        ...config,
    })
}
