import {
    findUserById,
    findUserByEmail,
    findUsersWithPagination,
} from "@/services/userSvc"

import { HTTP404Error } from "@/handlers/api/apiErrors"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Request, Response } from "express"

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const user = await findUserById(req.params.id)

    if (!user) {
        throw new HTTP404Error("User not found")
    }

    res.json(user)
}

export const searchUsersWithPaginationHandler = async (
    req: Request,
    res: Response
) => {
    const { query } = req.query

    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10

    const result = await findUsersWithPagination({
        query: query as string,
        pagination: {
            page,
            limit,
        },
    })

    res.json(result)
}

export const getMeHandler = async (req: ProtectedRequest, res: Response) => {
    const user = await findUserById(req.userId)

    if (!user) {
        throw new HTTP404Error("User not found")
    }

    res.json(user)
}

export const getUserByEmailHandler = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.params.email)

    if (user) {
        throw new HTTP404Error("User not found")
    }

    res.json(user)
}
