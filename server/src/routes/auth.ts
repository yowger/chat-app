import { Router } from "express"

import { login, logOut, refreshToken, register } from "@/controllers/auth"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshToken)
router.post("log-out", logOut)

export default router
