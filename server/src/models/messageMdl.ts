import { prop, getModelForClass, Ref, modelOptions } from "@typegoose/typegoose"

import { User } from "@/models/userMdl"

export class Message {
    @prop({ required: true })
    public content!: string

    @prop({ ref: () => User, required: true })
    public sender!: Ref<User>

    @prop({ ref: () => User, required: true })
    public recipient!: Ref<User>

    @prop({ default: Date.now })
    public createdAt?: Date

    @prop({ default: null })
    public readAt?: Date | null
}

const MessageModel = getModelForClass(Message)

export default MessageModel
