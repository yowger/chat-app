import dotenv from "dotenv"
import path from "path"

const env = process.env.NODE_ENV || "development"

const envPath = path.resolve(__dirname, `../../config/${env}.env`)
dotenv.config({ path: envPath })

const config = {
    nodeEnv: process.env.NODE_ENV,
    database: process.env.DATABASE,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    accessTokenKey: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenKey: process.env.REFRESH_TOKEN_SECRET,
}

export default config
