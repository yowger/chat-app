import { Router } from "express"

import authenticate from "@/middleware/authenticate"

import {
    getMeHandler,
    getUserByIdHandler,
    getUserByEmailHandler,
    updateUsernameHandler,
} from "@/controllers/user"

import asyncHandler from "@/handlers/middleware/asyncHandler"

const router = Router()

router.get("/me", authenticate, asyncHandler(getMeHandler))
router.get("/:id", asyncHandler(getUserByIdHandler))
router.get("/email/:email", asyncHandler(getUserByEmailHandler))
router.put("/username/:id", asyncHandler(updateUsernameHandler))

export default router
