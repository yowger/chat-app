import { Router } from "express"

import {
    loginHandler,
    logOutHandler,
    refreshTokenHandler,
    registerHandler,
} from "@/controllers/authCtrl"

import asyncHandler from "@/handlers/middleware/asyncHandlerMw"

const router = Router()

router.post("/register", asyncHandler(registerHandler))
router.post("/login", asyncHandler(loginHandler))
router.post("/refresh", asyncHandler(refreshTokenHandler))
router.post("/logout", asyncHandler(logOutHandler))

export default router
