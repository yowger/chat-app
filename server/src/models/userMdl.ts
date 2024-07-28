import {
    DocumentType,
    index,
    modelOptions,
    pre,
    prop,
    Severity,
} from "@typegoose/typegoose"

import { comparePassword, hashPassword } from "@/utils/bcrypt"

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ username: 1 })
@pre<User>("save", async function (next) {
    if (this.isModified || this.isNew) {
        this.password = await hashPassword(this.password)
    }

    next()
})
export class User {
    @prop({ required: true })
    username!: string

    @prop({ required: true, select: false })
    password!: string

    @prop({ required: true, unique: true, lowercase: true })
    email!: string

    async comparePassword(
        this: DocumentType<User>,
        candidatePassword: string
    ): Promise<boolean> {
        return comparePassword(candidatePassword, this.password)
    }
}
