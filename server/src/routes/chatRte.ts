import { Router } from "express"

import authenticate from "@/middleware/authenticateMw"

import {
    CreateGroupChatHandler,
    createSingleChatHandler,
    getChatsWithPaginationHandler,
} from "@/controllers/chatCtrl"

import asyncHandler from "@/handlers/middleware/asyncHandlerMw"

const router = Router()

router.get("/", authenticate, asyncHandler(getChatsWithPaginationHandler))
router.post("/", authenticate, asyncHandler(createSingleChatHandler))
router.post("/group", authenticate, asyncHandler(CreateGroupChatHandler))

export default router
