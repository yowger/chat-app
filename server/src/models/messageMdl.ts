import { prop, getModelForClass, Ref, modelOptions } from "@typegoose/typegoose"

import { Chat } from "@/models/chatMdl"
import { User } from "@/models/userMdl"

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Message {
    @prop({ required: true })
    content!: string

    @prop({ required: true, ref: () => User })
    public sender!: Ref<Chat>

    @prop({ required: true, ref: () => User })
    public recipient!: Ref<User>

    @prop({ default: null })
    public readAt?: Date | null
}

const MessageModel = getModelForClass(Message)

export default MessageModel
