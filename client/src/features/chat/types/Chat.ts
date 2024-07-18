import { ChatUser } from "./User"

export interface Chat {
    _id: string
    type: ChatType
    participants: ChatUser[]
    name: string
    groupAdmin: ChatUser
    createdAt: Date
    latestMessage?: {
        _id: string
        content: string
        sender: ChatUser
        createdAt: Date
    }
}

export type ChatType = "single" | "group"

export type ChatId = string | null
