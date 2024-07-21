import { ChatUser, Recipient } from "./User"

export interface Chat {
    _id: string
    type: ChatType
    participants: Recipient[]
    name: string
    groupAdmin: ChatUser
    createdAt: Date
    latestMessage?: {
        _id: string
        content: string
        sender: Recipient
        createdAt: Date
    }
}

export type ChatType = "single" | "group"

export type ChatId = string | null
