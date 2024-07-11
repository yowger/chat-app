import { Router } from "express"

import authRouter from "@/routes/authRte"
import messageRoutes from "@/routes/messageRte"
import userRoutes from "@/routes/userRte"

const router = Router()

router.use("/", authRouter)
router.use("/messages", messageRoutes)
router.use("/users", userRoutes)

export default router
