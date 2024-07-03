import { formatHttpWithError } from "@/utils/formatHttp"
import { isOperationalError } from "@/handlers/utils/error"
import logger from "@/utils/logger"

import type { NextFunction, Request, Response } from "express"

const errorLogger = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const originalSend = res.send

    res.send = function (body: any) {
        const formattedData = formatHttpWithError({
            error,
            req,
            res,
            responseBody: JSON.parse(body),
        })

        if (isOperationalError(error)) {
            logger.log("error", "Operational error", formattedData)
        } else {
            logger.log("fatal", "Fatal error", formattedData)
        }

        return originalSend.call(this, body)
    }

    next(error)
}

export default errorLogger
