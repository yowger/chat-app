import BaseError from "@/handlers/BaseError"

export const isOperationalError = (error: Error): Boolean => {
    if (error instanceof BaseError) {
        return error.isOperational
    }

    return false
}
