import { Router } from "express"

import authRouter from "@/routes/authRte"
import chatRouter from "@/routes/chatRte"
import messageRoutes from "@/routes/messageRte"
import userRoutes from "@/routes/userRte"

const router = Router()

router.use("/", authRouter)
router.use("/chat", chatRouter)
router.use("/message", messageRoutes)
router.use("/user", userRoutes)

export default router
