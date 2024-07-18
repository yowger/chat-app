import { modelOptions, prop, Ref } from "@typegoose/typegoose"

import { ChatType } from "@/enums/chat/chat"

import { Message } from "@/models/messageMdl"
import { ReadBy } from "@/models/readByMdl"
import { User } from "@/models/userMdl"

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Chat {
    @prop({ required: true, enum: ChatType })
    type: ChatType

    @prop({ required: true, ref: () => User })
    participants!: Ref<User>[]

    @prop({
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
}
