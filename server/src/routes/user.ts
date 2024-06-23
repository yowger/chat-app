import { Router } from "express"
import {
    createUser,
    findUserById,
    findUserByEmail,
    updateUsername,
} from "@/services/user"

const router = Router()

router.post("/users", async (req, res) => {
    const user = await createUser(req.body)
    res.status(201).json(user)
})

router.get("/users/:id", async (req, res) => {
    const user = await findUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

router.get("/users/email/:email", async (req, res) => {
    const user = await findUserByEmail(req.params.email)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

router.put("/users/:id/username", async (req, res) => {
    const updatedUser = await updateUsername(req.params.id, req.body.username)
    if (updatedUser) {
        res.json(updatedUser)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

export default router
