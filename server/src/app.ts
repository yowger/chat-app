import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import express from "express"

import corsOptions from "@/config/cors"

import errorLogger from "@/handlers/middleware/errorLogger"
import invalidPathHandler from "@/handlers/middleware/invalidPathHandler"
import errorHandler from "@/handlers/middleware/errorHandler"

import routes from "@/routes"

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)
app.use(compression())

app.use("/api", routes)

app.use(invalidPathHandler)
app.use(errorLogger)
app.use(errorHandler)

export default app
