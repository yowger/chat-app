import { prop, Ref } from "@typegoose/typegoose"

import { User } from "@/models/userMdl"

export class ReadBy {
    @prop({ required: true, ref: () => User })
    user!: Ref<User>

    @prop({ required: true, default: Date.now })
    readAt!: Date
}
