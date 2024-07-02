import type { CookieOptions } from "express"

const oneDayInMs = 24 * 60 * 60 * 1000

export const refreshTokenOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: oneDayInMs,
}
