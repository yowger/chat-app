import mongoose from "mongoose"

import config from "@/config/env"

import logger from "@/utils/logger"

import type { Error as MongoError } from "mongoose"

const connectDb = async (): Promise<void> => {
    mongoose.connect(config.database)

    mongoose.connection.on("connected", () => {
        logger.info("Mongoose default connection open")
    })

    mongoose.connection.on("error", (error: MongoError) => {
        logger.error("Mongoose default connection error", error)
    })

    mongoose.connection.on("disconnected", () => {
        logger.info("Mongoose default connection disconnected")
    })

    process.on("SIGINT", () => {
        mongoose.connection.close().finally(() => {
            logger.info(
                "Mongoose default connection disconnected through app termination"
            )

            process.exit(0)
        })
    })
}

export default connectDb
