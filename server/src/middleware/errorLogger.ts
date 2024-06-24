import log from "@/utils/logger"

import type { NextFunction, Request, Response } from "express"

const errorLogger = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    log.error(`error ${error.message}`)

    next(error)
}

export default errorLogger
