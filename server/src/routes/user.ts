import { Router } from "express"

import {
    getUserByIdHandler,
    getUserByEmailHandler,
    updateUsernameHandler,
} from "@/controllers/user"

import asyncHandler from "@/handlers/middleware/asyncHandler"

const router = Router()

router.get("/users/:id", asyncHandler(getUserByIdHandler))
router.get("/users/email/:email", asyncHandler(getUserByEmailHandler))
router.put("/users/:id/username", asyncHandler(updateUsernameHandler))

export default router
