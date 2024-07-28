import { HTTP403Error, HTTP404Error } from "@/handlers/api/apiErrors"

import { MessageModel } from "@/models"

import { findChatById, updateChat } from "./chatSvc"

import type { FilterQuery } from "mongoose"
import type { Pagination } from "@/types/common"

interface MessageInput {
    _id?: string
    chatId: string
    senderId: string
    content: string
}

interface CreateMessageInput extends MessageInput {}

export const createMessage = async ({
    chatId,
    senderId,
    content,
}: CreateMessageInput) => {
    const createdMessage = await MessageModel.create({
        chat: chatId,
        sender: senderId,
        content: content,
    })

    return createdMessage.toObject()
}

interface sendMessageInput extends MessageInput {}

export const sendMessage = async (input: sendMessageInput) => {
    const { _id, chatId, senderId, content } = input

    const chatExist = await findChatById(chatId)
    if (!chatExist) {
        throw new HTTP404Error("Chat does not exist")
    }

    const isParticipant = chatExist.participants.some((participant) =>
        participant._id.equals(senderId)
    )
    if (!isParticipant) {
        throw new HTTP403Error("User is not a participant of the chat")
    }

    const createdMessage = await createMessage({
        _id,
        chatId: chatId,
        senderId: senderId,
        content: content,
    })

    return createdMessage
}

interface GetMessagesWithWithPaginationOptions {
    query?: string | undefined
    pagination: Pagination
}

export const getMessagesWithWithPagination = async (
    chatId: string,
    options: GetMessagesWithWithPaginationOptions
) => {
    const { query, pagination } = options
    const { page = 1, limit = 10 } = pagination

    const skip = (page - 1) * limit

    const defaultQuery = { chat: chatId }
    const messageQuery: FilterQuery<typeof MessageModel> =
        query && query.trim() !== ""
            ? { ...defaultQuery, content: { $regex: query, $options: "i" } }
            : defaultQuery

    const messages = await MessageModel.find(messageQuery)
        .select({
            __v: 0,
        })
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({ path: "sender", select: "_id username" })
        .lean()
        .exec()

    return messages
}

export const countMessages = async (chatId: string): Promise<number> => {
    const total = await MessageModel.countDocuments({ chat: chatId })
        .lean()
        .exec()

    return total
}

interface GetMessagesByCursor {
    limit: number
    lastId?: string
}

export const getMessagesByCursor = async ({
    limit,
    lastId,
}: GetMessagesByCursor) => {
    const query = lastId ? { _id: { $lt: lastId } } : {}

    const messages = await MessageModel.find(query)
        .sort({ _id: -1 })
        .limit(limit)

    return messages
}

// export const findMessageById = async (messageId: string) => {
//     const message = await MessageModel.findById(messageId)
//         .populate("sender recipient")
//         .lean()
//         .exec()

//     return message
// }

// export const markMessageAsRead = async (messageId: string) => {
//     const message = await MessageModel.findByIdAndUpdate(
//         messageId,
//         { readAt: new Date() },
//         { new: true }
//     )
//         .lean()
//         .exec()

//     return message
// }

// export const deleteMessage = async (messageId: string) => {
//     await MessageModel.findByIdAndDelete(messageId).exec()
// }
