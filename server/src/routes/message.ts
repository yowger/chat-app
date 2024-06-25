import { Router } from "express"

import {
    createMessageHandler,
    getMessageByIdHandler,
    markMessageAsReadHandler,
    deleteMessageHandler,
} from "@/controllers/message"

import asyncHandler from "@/handlers/middleware/asyncHandler"

const router = Router()

router.post("/messages", asyncHandler(createMessageHandler))
router.get("/messages/:id", asyncHandler(getMessageByIdHandler))
router.put("/messages/:id/read", asyncHandler(markMessageAsReadHandler))
router.delete("/messages/:id", asyncHandler(deleteMessageHandler))

export default router
