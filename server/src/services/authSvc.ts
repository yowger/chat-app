import { signJwt } from "@/utils/jwt"

import { Types } from "mongoose"

export const signAccessToken = (userId: Types.ObjectId) => {
    const accessToken = signJwt({ userId }, "accessTokenPrivateKey", {
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
