import config from "@/config/env"

export const allowedOriginsArray: string[] = config.allowedOrigins
    .split(",")
    .map((origin) => origin.trim())
