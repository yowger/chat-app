import UserModel, { User } from "@/models/userMdl"

export const createUser = async (input: User) => {
    const { username, email, password } = input
    const createdUser = await UserModel.create({ username, email, password })

    return createdUser.toObject()
}

export const findUserById = async (id: string) => {
    const user = await UserModel.findById(id)
        .select("_id username email createdAt updatedAt")
        .lean()
        .exec()

    return user
}

export const findUsersWithPagination = async (
    query: string,
    page: number,
    limit: number
) => {
    const skip = (page - 1) * limit

    const users = await UserModel.find({
        username: { $regex: query, $options: "i" },
    })
        .skip(skip)
        .limit(limit)
        .select("_id username")
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
    const user = await UserModel.findOne({ email }).lean().exec()

    return user
}

export const updateUsername = async (id: string, username: string) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { username })
        .lean()
        .exec()

    return updatedUser
}
