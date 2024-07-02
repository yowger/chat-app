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
        if (!isOperationalError(error)) {
            const formattedData = formatHttpWithError({
                error,
                req,
                res,
                responseBody: JSON.parse(body),
            })

            logger.error("Non-Operational error", formattedData)
        }

        return originalSend.call(this, body)
    }

    next(error)
}

export default errorLogger
