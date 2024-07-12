import { HTTP403Error, HTTP404Error } from "@/handlers/api/apiErrors"

import { Pagination } from "@/types/common"

import { MessageModel } from "@/models"

import { findChatById, updateChat } from "./chatSvc"

import type { FilterQuery } from "mongoose"

interface sendMessageInput {
    chatId: string
    senderId: string
    content: string
}

export const sendMessage = async (input: sendMessageInput) => {
    const { chatId, senderId, content } = input

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

    const createdMessage = await MessageModel.create({
        chat: chatId,
        sender: senderId,
        content: content,
    })

    await updateChat(chatId, {
        latestMessage: createdMessage._id,
    })

    return createdMessage.toObject()
}

interface GetMessagesWithWithPagination extends Pagination {
    chatId: string
    query?: string | undefined
}

export const getMessagesWithWithPagination = async (
    input: GetMessagesWithWithPagination
) => {
    const { chatId, query, page = 1, limit = 10 } = input

    const skip = (page - 1) * limit

    const defaultQuery = { chat: chatId }
    const messageQuery: FilterQuery<typeof MessageModel> =
        query && query.trim() !== ""
            ? { ...defaultQuery, content: { $regex: new RegExp(query, "i") } }
            : defaultQuery

    const messages = await MessageModel.find(messageQuery)
        .select({
            __v: 0,
        })
        .sort({
            createdAt: 1,
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
