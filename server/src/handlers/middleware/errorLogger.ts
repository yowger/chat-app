import { formatHttpWithError } from "@/utils/formatHttp"
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
        const logData = formatHttpWithError(error, req, res, JSON.parse(body))
        logger.error(logData)

        return originalSend.call(this, body)
    }

    next(error)
}

export default errorLogger
