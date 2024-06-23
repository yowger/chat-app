import config from "@/config/env"

import type { CookieOptions } from "express"

// false in dev so cookies can work in thunderclient
const isProduction = config.nodeEnv === "production"
const oneDayInMs = 24 * 60 * 60 * 1000

export const refreshTokenOptions: CookieOptions = {
    httpOnly: isProduction,
    secure: isProduction,
    sameSite: "none",
    maxAge: oneDayInMs,
}
