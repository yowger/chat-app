import dotenv from "dotenv"
import path from "path"

const env = process.env.NODE_ENV || "development"

const envPath = path.resolve(__dirname, `../../config/${env}.env`)
dotenv.config({ path: envPath })

export default {
    nodeEnv: process.env.NODE_ENV,
    database: process.env.DATABASE,
}
