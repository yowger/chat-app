import dotenv from "dotenv"
import path from "path"

const env = process.env.NODE_ENV || "development"

const envPath = path.resolve(__dirname, `../../config/${env}.env`)

const dotEnvConfig: dotenv.DotenvConfigOptions | undefined =
    env === "production" ? undefined : { path: envPath }

dotenv.config(dotEnvConfig)

const config = {
    accessTokenKey: process.env.ACCESS_TOKEN_SECRET,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    database: process.env.DATABASE,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    refreshTokenKey: process.env.REFRESH_TOKEN_SECRET,
}

export default config
