// import log from "@/utils/logger/logger"

import { HTTP404Error } from "../api/apiErrors"

import type { Request, Response } from "express"
import { formatHttp } from "@/utils/formatHttp"

const invalidPathHandler = (req: Request, res: Response) => {
    // console.log(res.statusCode)
    // const message = `Route not found: ${req.method} ${req.url}`
    // log.warn({ message: "message", ...formatHttp(req, res) })

    // redo

    throw new HTTP404Error("Route not found")
}

export default invalidPathHandler
