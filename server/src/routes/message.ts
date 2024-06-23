import { Router } from "express"

import {
    createMessageHandler,
    getMessageByIdHandler,
    markMessageAsReadHandler,
    deleteMessageHandler,
} from "@/controllers/message"

const router = Router()

router.post("/messages", createMessageHandler)
router.get("/messages/:id", getMessageByIdHandler)
router.put("/messages/:id/read", markMessageAsReadHandler)
router.delete("/messages/:id", deleteMessageHandler)

export default router
