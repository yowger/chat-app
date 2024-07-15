export interface Profile {
    _id: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export type ChatUser = Pick<Profile, "_id" | "username">
