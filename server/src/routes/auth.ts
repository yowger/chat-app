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
router.post("/refresh", asyncHandler(refreshTokenHandler))
router.post("/logout", asyncHandler(logOutHandler))

export default router
