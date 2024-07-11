import BaseError from "@/handlers/BaseError"

import { HttpStatusCodes } from "@/enums/api/httpStatusCode"

export class HTTP400Error extends BaseError {
    constructor(
        description = "The request cannot be fulfilled due to bad syntax."
    ) {
        super("BAD REQUEST", HttpStatusCodes.BAD_REQUEST, true, description)
    }
}

export class HTTP401Error extends BaseError {
    constructor(description = "You are not authorized.") {
        super("UNAUTHORIZED", HttpStatusCodes.UNAUTHORIZED, true, description)
    }
}

export class HTTP403Error extends BaseError {
    constructor(
        description = "You don't have permission to access the requested resource."
    ) {
        super("FORBIDDEN", HttpStatusCodes.FORBIDDEN, true, description)
    }
}

export class HTTP404Error extends BaseError {
    constructor(description = "The requested resource could not be found.") {
        super("NOT FOUND", HttpStatusCodes.NOT_FOUND, true, description)
    }
}

export class HTTP409Error extends BaseError {
    constructor(
        description = "The request could not be completed because of a conflict in the request."
    ) {
        super("CONFLICT", HttpStatusCodes.CONFLICT, true, description)
    }
}

export class HTTP500Error extends BaseError {
    constructor(
        description = "Internal Server Error. Please try again later."
    ) {
        super(
            "INTERNAL SERVER ERROR",
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            true,
            description
        )
    }
}
