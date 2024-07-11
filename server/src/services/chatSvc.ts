import { HTTP404Error } from "@/handlers/api/apiErrors"

import ChatModel, { ChatType } from "@/models/chatMdl"

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
    const chat = await ChatModel.findById(chatId).populate("")
}
