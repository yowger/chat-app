import { isDevEnv } from "@/utils/env"

import type { CookieOptions } from "express"

const oneDayInMs = 24 * 60 * 60 * 1000

export const refreshTokenOptions: CookieOptions = {
    httpOnly: !isDevEnv,
    secure: !isDevEnv,
    sameSite: "none",
    maxAge: oneDayInMs,
}
