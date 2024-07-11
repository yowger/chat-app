import { Router } from "express"

import authenticate from "@/middleware/authenticate"

import {
    getMeHandler,
    getUserByIdHandler,
    getUserByEmailHandler,
    searchUsersWithPaginationHandler,
    updateUsernameHandler,
} from "@/controllers/userCtrl"

import asyncHandler from "@/handlers/middleware/asyncHandlerMw"

const router = Router()

router.get("/me", authenticate, asyncHandler(getMeHandler))
// router.get("/:id", asyncHandler(getUserByIdHandler))
router.get("/email/:email", asyncHandler(getUserByEmailHandler))
router.put("/username/:id", asyncHandler(updateUsernameHandler))
router.get(
    "/search",
    authenticate,
    asyncHandler(searchUsersWithPaginationHandler)
)

export default router
