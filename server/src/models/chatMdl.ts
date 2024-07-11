import { User } from "./userMdl"

import { prop, getModelForClass, Ref } from "@typegoose/typegoose"

export enum ChatType {
    SINGLE = "single",
    GROUP = "group",
}

export class Chat {
    @prop({ required: true, enum: ChatType })
    type: ChatType

    @prop({ required: true, ref: User })
    participants: Ref<User>[]

    @prop({
        required: true,
        conditional: (chat: Chat) => chat.type === ChatType.GROUP,
    })
    groupName?: string

    @prop({
        required: true,
        ref: User,
        conditional: (chat: Chat) => chat.type === ChatType.GROUP,
    })
    groupAdmin?: Ref<User>[]

    @prop({ required: true, default: Date.now })
    createdAt?: Date
}

const ChatModel = getModelForClass(Chat)

export default ChatModel
