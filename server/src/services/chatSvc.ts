import ChatModel, { ChatType } from "@/models/chatMdl"

import type { Chat } from "@/models/chatMdl"

export const createSingleChat = async (userId: string, participant: string) => {
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

    const groupChat = await ChatModel.create({
        type: ChatType.GROUP,
        participants,
        groupName,
        groupAdmin: [userId],
    })

    return groupChat.toObject()
}

export const findChatById = async (chatId: string) => {
    const chat = await ChatModel.findById(chatId).populate("")
}
