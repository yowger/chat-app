import { omit } from "lodash"
import { Types } from "mongoose"

import { signJwt } from "@/utils/jwt"

import { privateFields, User } from "@/models/user"

export const signAccessToken = (user: User) => {
    const payload = omit(user, privateFields)

    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: "15m",
    })

    return accessToken
}

export const signRefreshToken = (userId: Types.ObjectId) => {
    const refreshToken = signJwt(
        {
            id: userId,
        },
        "refreshTokenPrivateKey",
        {
            expiresIn: "24h",
        }
    )

    return refreshToken
}
