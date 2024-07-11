import { HttpStatusCodes } from "@/enums/api/httpStatusCode"

class BaseError extends Error {
    public readonly httpStatusCode: HttpStatusCodes
    public readonly isOperational: boolean

    constructor(
        name: string,
        httpStatusCode: HttpStatusCodes,
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
