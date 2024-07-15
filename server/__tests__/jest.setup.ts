import dotenv from "dotenv"
import path from "path"

const envPath = path.resolve(__dirname, `../config/test.env`)
console.log("🚀 ~ __dirname:", __dirname)
dotenv.config({ path: envPath })
