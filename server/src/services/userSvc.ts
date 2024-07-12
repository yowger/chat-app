import { User } from "@/models/userMdl"

import { UserModel } from "@/models"
import { Pagination } from "@/types/common"

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

interface findUsersWithPagination extends Pagination {
    query?: string | undefined
}

export const findUsersWithPagination = async (
    input: findUsersWithPagination
) => {
    const { query, page = 1, limit = 10 } = input

    if (query === undefined || query.trim() === "") {
        return {
            users: [],
            totalUsers: 0,
            totalPages: 0,
            currentPage: 1,
        }
    }

    const skip = (page - 1) * limit

    const users = await UserModel.find({
        username: { $regex: query, $options: "i" },
    })
        .sort({ username: 1 })
        .skip(skip)
        .limit(limit)
        .select({
            id: 1,
            username: 1,
        })
        .lean()
        .exec()

    const totalUsers = await UserModel.countDocuments({
        username: { $regex: query, $options: "i" },
    }).exec()

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
    }
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

export const updateUsername = async (id: string, username: string) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { username })
        .lean()
        .exec()

    return updatedUser
}
