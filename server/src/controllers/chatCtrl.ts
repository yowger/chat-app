import { HTTP404Error } from "@/handlers/api/apiErrors"
import {
    countChats,
    createGroupChat,
    createSingleChat,
    findChatByParticipants,
    getChatsWithPagination,
} from "@/services/chatSvc"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Response } from "express"

export const createChatHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { name, participants } = req.body
    const userId = req.userId
    const isGroup = participants.length > 1

    const chat = isGroup
        ? await createGroupChat(userId, { name, participants })
        : await createSingleChat(userId, participants[0])

    console.log("🚀 ~ chat:", chat)

    res.status(201).json(chat)
}

export const getChatsWithPaginationHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const userId = req.userId

    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10

    const chats = await getChatsWithPagination(userId, {
        pagination: {
            page,
            limit,
        },
    })

    const totalChats = await countChats(userId)

    const totalPages = Math.ceil(totalChats / limit)

    console.log("🚀 ~ chats:", chats)
    res.json({
        chats,
        pagination: {
            totalItems: totalChats,
            page,
            limit,
            totalPages,
        },
    })
}

export const findChatByParticipantsHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { participants } = req.body
    const userId = req.userId

    const chat = await findChatByParticipants([userId, ...participants])
    console.log("🚀 ~ chat:", chat)

    if (!chat) {
        throw new HTTP404Error("chat not found")
    }

    res.json(chat)
}
