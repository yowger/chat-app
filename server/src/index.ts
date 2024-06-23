import "module-alias/register"

import app from "@/app"

import connectDb from "@/utils/connectDb"
import log from "@/utils/logger"

const startServer = async () => {
    await connectDb()

    app.set("port", 8000)
    const port = app.get("port")
    const server = app
        .listen(port, () => {
            const address = server.address()
            if (typeof address !== "string") {
                log.info(`server running on port: ${address?.port}`)
            }
        })
        .on("error", (error) => {
            log.error("error connecting to server", error)
        })
}

startServer()
