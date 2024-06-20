import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)

app.use(compression())

export default app
