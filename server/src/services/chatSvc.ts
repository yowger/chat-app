import { ChatType } from "@/enums/chat/chat"

import { HTTP404Error } from "@/handlers/api/apiErrors"

import { ChatModel } from "@/models"

import { checkIfUsersExist, findUserById } from "@/services/userSvc"

import type { Chat } from "@/models/chatMdl"

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
        return existingChat.toObject()
    }

    const singleChat = new ChatModel({
        type: ChatType.SINGLE,
        participants: [userId, participant],
    })

    return singleChat.toObject()
}

interface createGroupChatInput extends Omit<Chat, "type" | "groupAdmin"> {}

export const createGroupChat = async (
    userId: string,
    input: createGroupChatInput
) => {
    const { participants, groupName } = input

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
        groupName,
        groupAdmin: [userId],
    })

    return groupChat.toObject()
}

export const findChatById = async (chatId: string) => {
    const chat = await ChatModel.findById(chatId)
        .select({
            type: 1,
            participants: 1,
            groupName: 1,
            groupAdmin: 1,
            createdAt: 1,
        })
        .lean()
        .exec()

    if (!chat) {
        return null
    }

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
