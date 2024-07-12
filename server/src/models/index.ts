import { getModelForClass } from "@typegoose/typegoose"

import { Chat } from "@/models/chatMdl"
import { Message } from "@/models/messageMdl"
import { User } from "@/models/userMdl"

export const ChatModel = getModelForClass(Chat)
export const MessageModel = getModelForClass(Message)
export const UserModel = getModelForClass(User)
