import { Types } from "mongoose"

import { signJwt } from "@/utils/jwt"

import { User } from "@/models/user"

export const signAccessToken = (user: User) => {
    const { password, ...userWithoutPassword } = user

    const accessToken = signJwt(userWithoutPassword, "accessTokenPrivateKey", {
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
