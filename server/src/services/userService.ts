import { User, UserModel } from "@/models/user"

export const createUser = async (input: User) => {
    const createdUser = await UserModel.create(input)

    return createdUser.toObject()
}

export const findUserById = async (id: string) => {
    const user = await UserModel.findById(id).lean().exec()

    return user
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
