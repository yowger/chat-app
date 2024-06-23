import { Router } from "express"

import {
    getUserByIdHandler,
    getUserByEmailHandler,
    updateUsernameHandler,
} from "@/controllers/user"

const router = Router()

router.get("/users/:id", getUserByIdHandler)
router.get("/users/email/:email", getUserByEmailHandler)
router.put("/users/:id/username", updateUsernameHandler)

export default router
