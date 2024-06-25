import log from "@/utils/logger"

import BaseError from "@/handlers/BaseError"

import type { NextFunction, Request, Response } from "express"

const errorLoggerHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof BaseError) {
        log.error(error)
    }

    log.error("unknown error: ", error)

    next(error)
}

export default errorLoggerHandler
