import type {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from "express"

import BaseError from "@/handlers/BaseError"

const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof BaseError) {
        return res.status(error.httpStatusCode).json({ message: error.message })
    }

    return res.status(500).json({
        message: "Internal server error",
    })
}

export default errorHandler
