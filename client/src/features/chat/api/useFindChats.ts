import { useMutation } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosError, AxiosInstance } from "axios"
import type { MutateConfig } from "@/lib/query"

interface FetchChatInput {
    participants: string[]
}

export interface FetchChatsByParticipantsResponse {
    _id: string
}

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

export const useFindChats = (options: UseFindChatsOptions = {}) => {
    const { config } = options

    const axiosPrivate = useAxiosPrivate()

    return useMutation<
        FetchChatsByParticipantsResponse,
        AxiosError,
        FetchChatInput
    >({
        mutationFn: (input: FetchChatInput) =>
            fetchChatsByParticipants(axiosPrivate, { input }),
        ...config,
    })
}
