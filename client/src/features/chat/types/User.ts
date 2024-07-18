export interface User {
    _id: string
    email: string
    username: string
    createdAt: string
    updatedAt: string
}

export interface ChatUser extends Pick<User, "_id" | "username"> {}

export interface Recipient extends Pick<User, "_id" | "username"> {}
