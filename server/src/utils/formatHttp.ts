import { Request, Response } from "express"

export const formatHttp = (req: Request, res: Response, responseBody: any) => {
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

export const formatHttpWithError = (
    error: Error,
    req: Request,
    res: Response,
    responseBody: any
) => {
    const formattedHttp = formatHttp(req, res, responseBody)

    return {
        ...formattedHttp,
        error: {
            message: error.message,
            stack: error.stack,
        },
    }
}
