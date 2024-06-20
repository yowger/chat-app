import mongoose from "mongoose"

import type { Error as MongoError } from "mongoose"

import config from "@/config"
console.log("🚀 ~ config:", config)

const connectDb = async (): Promise<void> => {
    mongoose.connect(config.database)

    mongoose.connection.on("connected", () => {
        console.log("Mongoose default connection open")
    })

    mongoose.connection.on("error", (error: MongoError) => {
        console.error("Mongoose default connection error", error)
    })

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose default connection disconnected")
    })

    process.on("SIGINT", () => {
        mongoose.connection.close().finally(() => {
            console.log(
                "Mongoose default connection disconnected through app termination"
            )
            process.exit(0)
        })
    })
}

export default connectDb
