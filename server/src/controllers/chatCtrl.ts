import { createGroupChat, createSingleChat } from "@/services/chatSvc"

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
