import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    Severity,
} from "@typegoose/typegoose"

export const privateFields = ["password", "__v"]

@index({ email: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
class User {
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

export { User, UserModel }
