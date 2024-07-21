import { ChatType } from "@/enums/chat/chat"

import { HTTP404Error } from "@/handlers/api/apiErrors"

import { ChatModel } from "@/models"

import { checkIfUsersExist, findUserById } from "@/services/userSvc"

import type { Chat } from "@/models/chatMdl"
import type { Pagination } from "@/types/common"

export const createSingleChat = async (userId: string, participant: string) => {
    const participantExist = await findUserById(participant)

    if (!participantExist) {
        throw new HTTP404Error("participant does not exist")
    }

    const existingChat = await ChatModel.findOne({
        type: ChatType.SINGLE,
        participants: { $all: [userId, participant] },
    })

    if (existingChat) {
        console.log("🚀 ~ createSingleChat ~ existingChat:", existingChat)
        return existingChat.toObject()
    }

    const singleChat = await ChatModel.create({
        type: ChatType.SINGLE,
        participants: [userId, participant],
    })

    return singleChat.toObject()
}

interface createGroupChatInput extends Omit<Chat, "type" | "groupAdmin"> {}

export const createGroupChat = async (
    userId: string,
    input: Partial<createGroupChatInput>
) => {
    const { participants } = input

    const uniqueParticipants = new Set([...participants, userId])

    const participantsExist = await checkIfUsersExist(
        Array.from(uniqueParticipants as unknown as string[])
    )

    if (!participantsExist) {
        throw new HTTP404Error("One or more participant do not exist")
    }

    const groupChat = await ChatModel.create({
        type: ChatType.GROUP,
        participants: Array.from(uniqueParticipants),
        groupAdmin: [userId],
    })

    return groupChat.toObject()
}

interface GetChatsWithPaginationOptions {
    pagination?: Pagination
}

export const getChatsWithPagination = async (
    userId: string,
    options: GetChatsWithPaginationOptions
) => {
    const { pagination } = options
    const { page = 1, limit = 10 } = pagination

    const skip = (page - 1) * limit

    const chats = await ChatModel.find({ participants: userId })
        .select({
            type: 1,
            participants: 1,
            name: 1,
            groupAdmin: 1,
            createdAt: 1,
            latestMessage: 1,
            latestMessageReadBy: 1,
        })
        .sort({
            updatedAt: 1,
        })
        .skip(skip)
        .limit(limit)
        .populate({ path: "participants", select: "_id username" })
        .populate({ path: "groupAdmin", select: "_id username" })
        .populate({
            path: "latestMessage",
            select: "_id content createdAt sender",
            populate: { path: "sender", select: "_id username" },
        })
        .lean()
        .exec()

    return chats
}

export const countChats = async (userId: string): Promise<number> => {
    const totalItems = await ChatModel.countDocuments({ participants: userId })
        .lean()
        .exec()

    return totalItems
}

export const findChatById = async (chatId: string) => {
    const chat = await ChatModel.findById(chatId)
        .select({
            type: 1,
            participants: 1,
            name: 1,
            groupAdmin: 1,
            createdAt: 1,
        })
        .lean()
        .exec()

    return chat
}

export const findChatByParticipants = async (participantIds: string[]) => {
    const chat = await ChatModel.findOne({
        participants: {
            $all: participantIds,
            $size: participantIds.length,
        },
    })
        .select({
            type: 1,
            participants: 1,
            name: 1,
            groupAdmin: 1,
            createdAt: 1,
            latestMessage: 1,
            latestMessageReadBy: 1,
        })
        .populate({ path: "participants", select: "_id username" })
        .populate({ path: "groupAdmin", select: "_id username" })
        .populate({
            path: "latestMessage",
            select: "_id content createdAt sender",
            populate: { path: "sender", select: "_id username" },
        })
        .lean()
        .exec()

    return chat
}

export const updateChat = async (
    chatId: string,
    updateFields: Partial<Chat>
) => {
    const updatedChat = await ChatModel.findByIdAndUpdate(
        chatId,
        updateFields,
        {
            new: true,
        }
    )

    return updatedChat
}
