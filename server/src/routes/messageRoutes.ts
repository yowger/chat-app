import { Router } from "express"
import {
    createMessage,
    findMessageById,
    markMessageAsRead,
    deleteMessage,
} from "@/services/messageService"

const router = Router()

router.post("/messages", async (req, res) => {
    const message = await createMessage(req.body)
    res.status(201).json(message)
})

router.get("/messages/:id", async (req, res) => {
    const message = await findMessageById(req.params.id)
    if (message) {
        res.json(message)
    } else {
        res.status(404).json({ message: "Message not found" })
    }
})

router.put("/messages/:id/read", async (req, res) => {
    const message = await markMessageAsRead(req.params.id)
    if (message) {
        res.json(message)
    } else {
        res.status(404).json({ message: "Message not found" })
    }
})

router.delete("/messages/:id", async (req, res) => {
    await deleteMessage(req.params.id)
    res.status(204).send()
})

export default router
