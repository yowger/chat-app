import cors from "cors"

import config from "@/config/env"

import log from "@/utils/logger"

const allowedOriginsSet = new Set(
    config.allowedOrigins?.split(",").map((origin) => origin.trim()) || []
)

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOriginsSet.has(origin) || !origin) {
            callback(null, true)
        } else {
            const errorMessage = `Origin '${origin}' not allowed by CORS`
            log.error("cors disallowed origin", { error: errorMessage })

            callback(new Error(errorMessage))
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}

export default corsOptions
