import "module-alias/register"

import app from "@/app"

import { initSocket } from "@/sockets"

import { isOperationalError } from "@/handlers/utils/error"

import connectDb from "@/utils/connectDb"
import logger from "@/utils/logger"

import config from "@/config/env"

const startServer = async () => {
    await connectDb()

    const port = config.port || 8000
    const server = app.listen(port, () => {
        logger.log("info", "Server started", { port })
    })

    initSocket(server)

    process.on("unhandledRejection", (error) => {
        logger.log("error", "unhandled rejection", error)

        if (!isOperationalError) {
            process.exit(1)
        }
    })

    process.on("uncaughtException", (error) => {
        logger.log("error", "Uncaught exception", error)

        if (!isOperationalError) {
            process.exit(1)
        }
    })
}

startServer()
