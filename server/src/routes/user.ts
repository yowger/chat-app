import { Router } from "express"

import {
    getUserById,
    getUserByEmail,
    updateUserUsername,
} from "@/controllers/user"

const router = Router()

router.get("/users/:id", getUserById)
router.get("/users/email/:email", getUserByEmail)
router.put("/users/:id/username", updateUserUsername)

export default router
