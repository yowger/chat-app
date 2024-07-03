import { refreshTokenOptions } from "@/config/cookies"

import { comparePassword, hashPassword } from "@/utils/bcrypt"
import { verifyJwt } from "@/utils/jwt"

import { createUser, findUserByEmail, findUserById } from "@/services/user"
import { signAccessToken, signRefreshToken } from "@/services/auth"

import {
    HTTP401Error,
    HTTP404Error,
    HTTP409Error,
} from "@/handlers/api/apiErrors"

import type { Request, Response } from "express"

export const registerHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        throw new HTTP409Error("User with this email address already exists")
    }

    const hashedPassword = await hashPassword(password)

    const createdUser = await createUser({
        username,
        email,
        password: hashedPassword,
    })

    res.status(201).json(createdUser)
}

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (!existingUser) {
        throw new HTTP404Error("User with this email address already exists")
    }

    const isPasswordMatch = await comparePassword(
        password,
        existingUser.password
    )
    if (!isPasswordMatch) {
        throw new HTTP401Error("Invalid credentials")
    }

    const accessToken = signAccessToken(existingUser)
    const refreshToken = signRefreshToken(existingUser._id)
    res.cookie("refreshToken", refreshToken, refreshTokenOptions)

    res.status(200).json({
        accessToken,
    })
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        throw new HTTP401Error("Invalid credentials")
    }

    const decodedToken = verifyJwt<{ id: string }>(
        refreshToken,
        "refreshTokenPrivateKey"
    )
    if (!decodedToken) {
        throw new HTTP401Error("Invalid credentials")
    }

    const user = await findUserById(decodedToken.id)
    if (!user) {
        throw new HTTP401Error("Invalid credentials")
    }

    const accessToken = signAccessToken(user)

    res.status(200).json({
        accessToken,
    })
}

export const logOutHandler = async (req: Request, res: Response) => {
    res.clearCookie("refreshToken")

    res.status(200).json({
        message: "Logout successful",
    })
}
