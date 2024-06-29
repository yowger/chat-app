import "module-alias/register"

import app from "@/app"

import { isOperationalError } from "@/handlers/utils/error"

import connectDb from "@/utils/connectDb"
import logger from "@/utils/logger"

const startServer = async () => {
    process.on("unhandledRejection", (error) => {
        throw error
    })

    process.on("uncaughtException", (error) => {
        logger.error(error)

        if (!isOperationalError) {
            process.exit(1)
        }
    })

    await connectDb()

    app.set("port", 8000)
    const port = app.get("port")
    const server = app
        .listen(port, () => {
            const address = server.address()
            if (typeof address !== "string") {
                logger.info("server running on port %d", address?.port)
            }
        })
        .on("error", (error) => {
            logger.error("error connecting to server", error)
        })
}

startServer()
