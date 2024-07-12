import { prop, Ref } from "@typegoose/typegoose"

import { ChatType } from "@/enums/chat/chat"

import { Message } from "@/models/messageMdl"
import { ReadBy } from "@/models/readByMdl"
import { User } from "@/models/userMdl"

export class Chat {
    @prop({ required: true, enum: ChatType })
    type: ChatType

    @prop({ required: true, ref: () => User })
    participants!: Ref<User>[]

    @prop({
        required: true,
        conditional: (chat: Chat) => chat.type === ChatType.GROUP,
    })
    groupName!: string

    @prop({
        required: true,
        ref: () => User,
        conditional: (chat: Chat) => chat.type === ChatType.GROUP,
    })
    groupAdmin!: Ref<User>[]

    @prop({ ref: () => Message })
    latestMessage?: Ref<Message>

    @prop({ default: [], type: () => ReadBy })
    latestMessageReadBy?: ReadBy[]

    @prop({ required: true, default: Date.now })
    createdAt?: Date
}
