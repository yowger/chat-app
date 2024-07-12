import { HTTP401Error } from "@/handlers/api/apiErrors"

import { verifyJwt } from "@/utils/jwt"

import type { Response, NextFunction } from "express"
import type { ProtectedRequest } from "@/types/appRequest"

const authenticate = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.headers.authorization?.startsWith("Bearer")) {
            throw new HTTP401Error()
        }
        const token = req.headers.authorization.split(" ")[1]

        const decoded = verifyJwt<{ userId: string }>(
            token,
            "accessTokenPrivateKey"
        )

        if (!decoded) {
            throw new HTTP401Error()
        }

        req.userId = decoded.userId

        next()
    } catch (error) {
        next(error)
    }
}

export default authenticate
