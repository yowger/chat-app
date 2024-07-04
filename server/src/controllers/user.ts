import { findUserById, findUserByEmail, updateUsername } from "@/services/user"

import { HTTP404Error } from "@/handlers/api/apiErrors"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Request, Response } from "express"

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const user = await findUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        throw new HTTP404Error("User not found")
    }
}

export const getMeHandler = async (req: ProtectedRequest, res: Response) => {
    const user = await findUserById(req.userId)
    if (user) {
        res.json(user)
    } else {
        throw new HTTP404Error("User not found")
    }
}

export const getUserByEmailHandler = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.params.email)
    if (user) {
        res.json(user)
    } else {
        throw new HTTP404Error("User not found")
    }
}

export const updateUsernameHandler = async (req: Request, res: Response) => {
    const updatedUser = await updateUsername(req.params.id, req.body.username)
    if (updatedUser) {
        res.json(updatedUser)
    } else {
        throw new HTTP404Error("User not found")
    }
}
