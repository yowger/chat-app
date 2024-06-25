import { httpStatusCodes } from "@/handlers/api/types/httpStatusCode"

class BaseError extends Error {
    public readonly httpStatusCode: httpStatusCodes
    public readonly isOperational: boolean

    constructor(
        name: string,
        httpStatusCode: httpStatusCodes,
        isOperational: boolean,
        description: string
    ) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.httpStatusCode = httpStatusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

export default BaseError
