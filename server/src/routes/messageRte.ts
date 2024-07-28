import { Router } from "express"

import {
    getMessagesByCursorHandler,
    getMessageWithPaginationHandler,
    // createMessageHandler,
    // getMessageByIdHandler,
    // markMessageAsReadHandler,
    // deleteMessageHandler,
    sendMessageHandler,
} from "@/controllers/messageCtrl"

import authenticate from "@/middleware/authenticateMw"
import asyncHandler from "@/handlers/middleware/asyncHandlerMw"

const router = Router()

router.get("/", authenticate, asyncHandler(getMessageWithPaginationHandler))
router.get("/cursor", authenticate, asyncHandler(getMessagesByCursorHandler))
router.post("/", authenticate, asyncHandler(sendMessageHandler))

// router.get("/messages/:id", asyncHandler(getMessageByIdHandler))
// router.put("/messages/:id/read", asyncHandler(markMessageAsReadHandler))
// router.delete("/messages/:id", asyncHandler(deleteMessageHandler))

export default router
