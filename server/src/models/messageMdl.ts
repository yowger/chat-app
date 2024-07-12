import { prop, Ref, modelOptions } from "@typegoose/typegoose"

import { Chat } from "@/models/chatMdl"
import { ReadBy } from "@/models/readByMdl"
import { User } from "@/models/userMdl"

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Message {
    @prop({ required: true })
    content!: string

    @prop({ required: true, ref: () => Chat })
    chat!: Ref<Chat>

    @prop({ required: true, ref: () => User })
    sender!: Ref<User>

    @prop({ default: [], type: () => ReadBy })
    readAt?: ReadBy[]
}
