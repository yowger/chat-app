import { refreshTokenOptions } from "@/config/cookies"

import { comparePassword, hashPassword } from "@/utils/bcrypt"
import { verifyJwt } from "@/utils/jwt"

import { createUser, findUserByEmail, findUserById } from "@/services/user"
import { signAccessToken, signRefreshToken } from "@/services/auth"

import type { Request, Response } from "express"

export const registerHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "User with this email address already exists" })
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
        return res
            .status(404)
            .json({ message: "User with this email address already exists" })
    }

    const isPasswordMatch = await comparePassword(
        password,
        existingUser.password
    )
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const accessToken = signAccessToken(existingUser)
    const refreshToken = signRefreshToken(existingUser._id)

    res.cookie("refresh", refreshToken, refreshTokenOptions)

    res.status(200).json({
        accessToken,
    })
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const decodedToken = verifyJwt<{ id: string }>(
        refreshToken,
        "refreshTokenPrivateKey"
    )
    if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await findUserById(decodedToken.id)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const accessToken = signAccessToken(user)

    res.status(200).json({
        accessToken,
    })
}

export const logOutHandler = async (req: Request, res: Response) => {
    res.clearCookie("refresh")

    res.status(200).json({
        message: "Logout successful",
    })
}
