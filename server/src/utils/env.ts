import config from "@/config/env"

export const isDevEnv: Boolean = config.nodeEnv === "development"
