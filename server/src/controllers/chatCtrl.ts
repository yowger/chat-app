import {
    countChats,
    createGroupChat,
    createSingleChat,
    getChatsWithPagination,
} from "@/services/chatSvc"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Response } from "express"

export const createSingleChatHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { participant } = req.body
    const userId = req.userId

    const chat = await createSingleChat(userId, participant)
    const { groupAdmin, ...restChat } = chat

    res.status(201).json(restChat)
}

export const CreateGroupChatHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { groupName, participants } = req.body
    const userId = req.userId

    const chat = await createGroupChat(userId, { groupName, participants })

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
