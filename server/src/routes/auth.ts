import { Router } from "express"

import {
    loginHandler,
    logOutHandler,
    refreshTokenHandler,
    registerHandler,
} from "@/controllers/auth"

import asyncHandler from "@/handlers/middleware/asyncHandler"

const router = Router()

router.post("/register", asyncHandler(registerHandler))
router.post("/login", asyncHandler(loginHandler))
router.post("/refresh-token", asyncHandler(refreshTokenHandler))
router.post("log-out", asyncHandler(logOutHandler))

export default router
