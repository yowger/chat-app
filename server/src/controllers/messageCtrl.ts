import { updateChat } from "@/services/chatSvc"
import {
    countMessages,
    getMessagesByCursor,
    getMessagesWithWithPagination,
    // createMessage,
    // findMessageById,
    // markMessageAsRead,
    // deleteMessage,
    sendMessage,
} from "@/services/messageSvc"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Response } from "express"

export const sendMessageHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { _id, chatId, content } = req.body
    const userId = req.userId

    const message = await sendMessage({
        _id,
        chatId,
        senderId: userId,
        content,
    })

    await updateChat(chatId, {
        latestMessage: message._id,
    })

    res.status(201).json(message)
}

export const getMessageWithPaginationHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { chatId, query } = req.query

    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10

    const messages = await getMessagesWithWithPagination(chatId as string, {
        query: query as unknown as string,
        pagination: {
            page,
            limit,
        },
    })

    const totalMessages = await countMessages(chatId as string)

    const totalPages = Math.ceil(totalMessages / limit)

    res.json({
        messages,
        pagination: {
            totalItems: totalMessages,
            page,
            limit,
            totalPages,
        },
    })
}

export const getMessagesByCursorHandler = async (
    req: ProtectedRequest,
    res: Response
) => {
    const { limit = 10, lastId } = req.query

    const messages = await getMessagesByCursor({
        limit: Number(limit),
        lastId: lastId as string,
    })

    res.status(200).json(messages)
}

// export const createMessageHandler = async (req: Request, res: Response) => {
//     const message = await createMessage(req.body)
//     res.status(201).json(message)
// }

// export const getMessageByIdHandler = async (req: Request, res: Response) => {
//     const message = await findMessageById(req.params.id)

//     if (!message) {
//         throw new HTTP404Error("Message not found")
//     }

//     res.json(message)
// }

// export const markMessageAsReadHandler = async (req: Request, res: Response) => {
//     const message = await markMessageAsRead(req.params.id)
//     if (!message) {
//         throw new HTTP404Error("Message not found")
//     }

//     res.json(message)
// }

// export const deleteMessageHandler = async (req: Request, res: Response) => {
//     await deleteMessage(req.params.id)
//     res.status(204).send()
// }
