import type { Request, Response } from "express"

const invalidPathHandler = (req: Request, res: Response) => {
    res.status(404).json({ message: "Api url not found." })
}

export default invalidPathHandler
