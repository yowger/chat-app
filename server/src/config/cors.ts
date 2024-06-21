import cors from "cors"

import config from "@/config/env"

const allowedOriginsSet = new Set(
    config.allowedOrigins?.split(",").map((origin) => origin.trim()) || []
)

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOriginsSet.has(origin) || !origin) {
            callback(null, true)
        } else {
            const errorMessage = `Origin '${origin}' not allowed by CORS`
            console.error("cors_disallowed_origin", errorMessage)
            callback(new Error(errorMessage))
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}

export default corsOptions
