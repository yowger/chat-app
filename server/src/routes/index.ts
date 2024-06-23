import { Router } from "express"

import authRouter from "@/routes/auth"
import messageRoutes from "@/routes/message"
import userRoutes from "@/routes/user"

const router = Router()

router.use("/", authRouter)
router.use("/messages", messageRoutes)
router.use("/users", userRoutes)

export default router
