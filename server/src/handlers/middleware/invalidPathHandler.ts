import { HTTP404Error } from "@/handlers/api/apiErrors"

import type { Request, Response } from "express"

const invalidPathHandler = (req: Request, res: Response) => {
    throw new HTTP404Error("Api route not found")
}

export default invalidPathHandler
