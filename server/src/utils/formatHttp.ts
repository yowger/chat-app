import { calculateElapsedTimeInSecs } from "@/utils//helpers"

import type { Request, Response } from "express"

interface FormatHttpParams {
    req: Request
    res: Response
    responseBody: any
    requestStartTime?: number | undefined
}

export const formatHttp = (params: FormatHttpParams) => {
    const { req, res, responseBody, requestStartTime } = params

    const requestDuration = requestStartTime
        ? calculateElapsedTimeInSecs(requestStartTime)
        : null

    return {
        request: {
            headers: req.headers,
            host: req.headers.host,
            baseUrl: req.url,
            method: req.method,
            body: req.body,
            params: req?.params,
            query: req.query,
            clientIp:
                req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        },
        response: {
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            responseTimeInSecs: requestDuration,
            body: responseBody,
        },
    }
}

interface FormatHttpWithErrorParams extends FormatHttpParams {
    error: Error
}

export const formatHttpWithError = (params: FormatHttpWithErrorParams) => {
    const { error, ...rest } = params

    const formattedHttp = formatHttp({ ...rest })

    return {
        ...formattedHttp,
        error: {
            message: error.message,
            stack: error.stack,
        },
    }
}
