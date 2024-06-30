import { Request, Response } from "express"

interface FormatHttpParams {
    req: Request
    res: Response
    responseBody: any
}

export const formatHttp = (params: FormatHttpParams) => {
    const { req, res, responseBody } = params

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
            body: responseBody,
        },
    }
}

interface FormatHttpWithErrorParams extends FormatHttpParams {
    error: Error
}

export const formatHttpWithError = (params: FormatHttpWithErrorParams) => {
    const { error, req, res, responseBody } = params

    const formattedHttp = formatHttp({ req, res, responseBody })

    return {
        ...formattedHttp,
        error: {
            message: error.message,
            stack: error.stack,
        },
    }
}
