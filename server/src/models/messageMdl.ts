import { prop, Ref, modelOptions, index } from "@typegoose/typegoose"
import { v4 as uuidv4 } from "uuid"

import { Chat } from "@/models/chatMdl"
import { ReadBy } from "@/models/readByMdl"
import { User } from "@/models/userMdl"

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
@index({ createdAt: 1 })
export class Message {
    @prop({ type: String, required: true, default: () => uuidv4() })
    @prop({ required: true })
    content!: string

    @prop({ required: true, ref: () => Chat })
    chat!: Ref<Chat>

    @prop({ required: true, ref: () => User })
    sender!: Ref<User>

    @prop({ default: [], type: () => ReadBy })
    readAt?: ReadBy[]
}
