import { Router } from "express"

import userRoutes from "./userRoutes"
import messageRoutes from "./messageRoutes"

const router = Router()

router.use("/users", userRoutes)
router.use("/messages", messageRoutes)

export default router
