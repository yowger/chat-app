import { Router } from "express"

import authenticate from "@/middleware/authenticateMw"

import {
    getMeHandler,
    getUserByIdHandler,
    getUserByEmailHandler,
    searchUsersWithPaginationHandler,
} from "@/controllers/userCtrl"

import asyncHandler from "@/handlers/middleware/asyncHandlerMw"

const router = Router()

router.get("/me", authenticate, asyncHandler(getMeHandler))
// router.get("/:id", asyncHandler(getUserByIdHandler))
router.get("/email/:email", asyncHandler(getUserByEmailHandler))
router.get("/", authenticate, asyncHandler(searchUsersWithPaginationHandler))

export default router
