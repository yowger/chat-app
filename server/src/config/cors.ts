import cors from "cors"

import logger from "@/utils/logger"

import { allowedOriginsArray } from "@/utils/origin"

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOriginsArray.includes(origin) || !origin) {
            callback(null, true)
        } else {
            const errorMessage = `Origin '${origin}' not allowed by CORS`
            logger.error("cors disallowed origin", { error: errorMessage })

            callback(new Error(errorMessage))
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}

export default corsOptions
