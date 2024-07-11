import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    Severity,
} from "@typegoose/typegoose"

@index({ username: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class User {
    @prop({ required: true })
    username!: string

    @prop({ required: true })
    password!: string

    @prop({ required: true, unique: true, lowercase: true })
    email!: string
}

const UserModel = getModelForClass(User)

export default UserModel
