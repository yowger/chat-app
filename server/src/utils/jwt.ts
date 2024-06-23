import jwt from "jsonwebtoken"

import config from "@/config/env"

type KeyName = "accessTokenPrivateKey" | "refreshTokenPrivateKey"

const getKey = (keyName: KeyName): string => {
    switch (keyName) {
        case "accessTokenPrivateKey":
            return config.accessTokenKey
        case "refreshTokenPrivateKey":
            return config.refreshTokenKey
        default:
            throw new Error(`Invalid key name: ${keyName}`)
    }
}

export const signJwt = (
    object: Object,
    keyName: KeyName,
    options?: jwt.SignOptions | undefined
) => {
    const signingKey = getKey(keyName)

    return jwt.sign(object, signingKey, {
        ...(options && options),
    })
}

export const verifyJwt = <T>(token: string, keyName: KeyName): T | null => {
    const publicKey = getKey(keyName)

    try {
        const decoded = jwt.verify(token, publicKey) as T

        return decoded
    } catch (e) {
        return null
    }
}
