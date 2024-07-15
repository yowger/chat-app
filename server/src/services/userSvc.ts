import { User } from "@/models/userMdl"

import { UserModel } from "@/models"
import { Pagination } from "@/types/common"

import type { FilterQuery } from "mongoose"

interface CreateUserInput extends Omit<User, "comparePassword"> {}

export const createUser = async (input: CreateUserInput) => {
    const { username, email, password } = input
    const createdUser = await UserModel.create({ username, email, password })

    return createdUser.toObject()
}

export const findUserById = async (id: string) => {
    const user = await UserModel.findById(id)
        .select({
            _id: 1,
            username: 1,
            email: 1,
            createdAt: 1,
            updatedAt: 1,
        })
        .lean()
        .exec()

    return user
}

export const checkIfUsersExist = async (
    userIds: string[]
): Promise<boolean> => {
    const participants = await UserModel.find({ _id: { $in: userIds } })

    return participants.length === userIds.length
}

interface findUsersWithPaginationOptions {
    query?: {
        username: string
    }
    pagination?: Pagination
}

export const findUsersWithPagination = async (
    options: findUsersWithPaginationOptions
) => {
    const { query, pagination } = options
    const { username = "" } = query
    const { page = 1, limit = 10 } = pagination

    const skip = (page - 1) * limit

    const chatQuery: FilterQuery<typeof UserModel> =
        username && username.trim() !== ""
            ? { username: { $regex: username, $options: "i" } }
            : {}

    const users = await UserModel.find(chatQuery)
        .sort({ username: 1 })
        .skip(skip)
        .limit(limit)
        .select({
            id: 1,
            username: 1,
        })
        .lean()
        .exec()

    return users
}

export const countUsers = async (username?: string): Promise<number> => {
    const chatQuery: FilterQuery<typeof UserModel> =
        username && username.trim() !== ""
            ? { username: { $regex: username, $options: "i" } }
            : {}

    const totalItems = await UserModel.countDocuments(chatQuery).lean().exec()

    return totalItems
}

export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email })
        .select({
            _id: 1,
            username: 1,
            password: 1,
            email: 1,
            createdAt: 1,
            updatedAt: 1,
        })
        .exec()

    return user
}
