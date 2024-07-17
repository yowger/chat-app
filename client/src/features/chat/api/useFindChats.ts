import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { QueryConfig } from "@/lib/query"

export interface FetchChatsByParticipantsResponse {}

interface fetchChatsByParticipantsOptions {
    input: {
        participants: string[]
    }
}

const fetchChatsByParticipants = async (
    axios: AxiosInstance,
    options: fetchChatsByParticipantsOptions
): Promise<FetchChatsByParticipantsResponse> => {
    const { input } = options
    const response = await axios.post("/api/chat/find", input)

    return response.data
}

interface useFindChatsOptions {
    input: {
        participants: string[]
    }
    config?: QueryConfig<FetchChatsByParticipantsResponse>
}

export const useFindChats = (options: useFindChatsOptions) => {
    const { input, config } = options
    const { participants } = input

    const axiosPrivate = useAxiosPrivate()

    return useQuery<FetchChatsByParticipantsResponse, Error>({
        queryKey: ["chat", "find", participants],
        queryFn: () =>
            fetchChatsByParticipants(axiosPrivate, {
                input: {
                    participants,
                },
            }),
        ...config,
    })
}
