import config from "@/config/env"

export const isDevEnv = () => (): Boolean => {
    return config.nodeEnv === "development"
}
