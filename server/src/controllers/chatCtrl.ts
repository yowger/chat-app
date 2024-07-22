import { HTTP404Error } from "@/handlers/api/apiErrors"
import {
    countChats,
    createGroupChat,
    createSingleChat,
    findChatByParticipants,
    getChatsWithPagination,
    updateChat,
} from "@/services/chatSvc"
import { sendMessage } from "@/services/messageSvc"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Response } from "express"

export const createChatHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { content, participants } = req.body
    const userId = req.userId
    const chatType = participants.length === 1 ? "single" : "group"

    let chat

    switch (chatType) {
        case "single":
            chat = await createSingleChat(userId, participants[0])
            break
        case "group":
            chat = await createGroupChat(userId, { participants })
    }

    if (content) {
        const chatId = chat._id as unknown as string

        const message = await sendMessage({
            chatId,
            senderId: userId,
            content,
        })

        chat = await updateChat(chatId, {
            latestMessage: message._id,
        })
    }

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
