import { findUserById, findUserByEmail, updateUsername } from "@/services/user"

import type { Request, Response } from "express"

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const user = await findUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
}

export const getUserByEmailHandler = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.params.email)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
}

export const updateUsernameHandler = async (req: Request, res: Response) => {
    const updatedUser = await updateUsername(req.params.id, req.body.username)
    if (updatedUser) {
        res.json(updatedUser)
    } else {
        res.status(404).json({ message: "User not found" })
    }
}