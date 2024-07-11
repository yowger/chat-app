import {
    createMessage,
    findMessageById,
    markMessageAsRead,
    deleteMessage,
} from "@/services/messageSvc"

import { HTTP404Error } from "@/handlers/api/apiErrors"

import type { Request, Response } from "express"

export const createMessageHandler = async (req: Request, res: Response) => {
    const message = await createMessage(req.body)
    res.status(201).json(message)
}

export const getMessageByIdHandler = async (req: Request, res: Response) => {
    const message = await findMessageById(req.params.id)
    if (message) {
        res.json(message)
    } else {
        throw new HTTP404Error("Message not found")
    }
}

export const markMessageAsReadHandler = async (req: Request, res: Response) => {
    const message = await markMessageAsRead(req.params.id)
    if (message) {
        res.json(message)
    } else {
        throw new HTTP404Error("Message not found")
    }
}

export const deleteMessageHandler = async (req: Request, res: Response) => {
    await deleteMessage(req.params.id)
    res.status(204).send()
}
