import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    Severity,
} from "@typegoose/typegoose"

@index({ email: 1 })
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
    public username!: string

    @prop({ required: true })
    password: string

    @prop({ required: true, unique: true, lowercase: true })
    public email!: string

    @prop()
    public createdAt?: Date

    @prop()
    public updatedAt?: Date
}

const UserModel = getModelForClass(User)

export default UserModel
