import UserModel, { User } from "@/models/user"

export const createUser = async (input: User) => {
    const createdUser = await UserModel.create(input)

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
