import mongoose from "mongoose"

import type { Error as MongoError } from "mongoose"

import config from "@/config/env"
import log from "@/utils/logger"

const connectDb = async (): Promise<void> => {
    mongoose.connect(config.database)

    mongoose.connection.on("connected", () => {
        log.info("Mongoose default connection open")
    })

    mongoose.connection.on("error", (error: MongoError) => {
        log.error("Mongoose default connection error", { error })
    })

    mongoose.connection.on("disconnected", () => {
        log.info("Mongoose default connection disconnected")
    })

    process.on("SIGINT", () => {
        mongoose.connection.close().finally(() => {
            log.info(
                "Mongoose default connection disconnected through app termination"
            )
            process.exit(0)
        })
    })
}

export default connectDb
