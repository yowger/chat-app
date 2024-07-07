import {
    findUserById,
    findUserByEmail,
    updateUsername,
    findUsersWithPagination,
} from "@/services/user"

import { HTTP400Error, HTTP404Error } from "@/handlers/api/apiErrors"

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

export const searchUsersWithPaginationHandler = async (
    req: Request,
    res: Response
) => {
    const { query } = req.query
    console.log("🚀 ~ query:", query)

    const emptyQuery = query === undefined
    if (emptyQuery) {
        return res.json({
            users: [],
            totalUsers: 0,
            totalPages: 0,
            currentPage: 1,
        })
    }

    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10

    const result = await findUsersWithPagination(query as string, page, limit)
    console.log("🚀 ~ result:", result)
    res.json(result)
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
