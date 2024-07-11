import { Router } from "express"

import authenticate from "@/middleware/authenticate"

import {
    CreateGroupChatHandler,
    createSingleChatHandler,
} from "@/controllers/chatCtrl"

const router = Router()

router.post("/single", authenticate, createSingleChatHandler)
router.post("/group", authenticate, CreateGroupChatHandler)

export default router
