import { Server as SocketIOServer } from "socket.io"

import { findUserById } from "@/services/userSvc"

import { allowedOriginsArray } from "@/utils/origin"
import { verifyJwt } from "@/utils/jwt"

import type { Server as HttpServer } from "http"
import type { Request } from "express"
import type { Socket } from "socket.io"
import { sendMessage } from "@/services/messageSvc"
import { updateChat } from "@/services/chatSvc"

interface ChatUser {
    id: string
    username: string
}

interface SocketRequest extends Request, ChatUser {
    _query: Record<string, string>
    user: ChatUser
}

interface Message {
    _id: string
    chatId: string
    recipientIds: string[]
    content: string
}

interface TypingData {
    chatId: string
    user: ChatUser
}

export const initSocket = (server: HttpServer) => {
    console.log("connect socket")

    const io = new SocketIOServer(server, {
        cors: {
            origin: allowedOriginsArray,
        },
    })

    io.engine.use(async (req: SocketRequest, res: Response, next: Function) => {
        const isHandshake = req._query.sid === undefined

        if (!isHandshake) {
            return next()
        }

        const header = req.headers["authorization"]

        if (!header.startsWith("bearer ")) {
            return next(new Error("invalid token"))
        }

        const token = header.substring(7)

        const decodedToken = verifyJwt<{ userId: string }>(
            token,
            "accessTokenPrivateKey"
        )

        if (!decodedToken) {
            console.log("invalid token")
            return next(new Error("invalid token token"))
        }

        const user = await findUserById(decodedToken.userId)

        if (!user) {
            return next(new Error("user does not exist"))
        }

        req.user = {
            id: user._id.toString(),
            username: user.username,
        }

        next()
    })

    io.on("connect", (socket: Socket) => {
        console.log("socket connected: ", socket.id)

        const req = socket.request as Request & { user: ChatUser }
        const userId = req.user.id

        socket.join(`user:${userId}`)

        socket.on("join_chat_room", (chatId: string) => {
            socket.join(`chat:${chatId}`)
            console.log(`User ${socket.id} joined room: ${chatId}`)
        })

        socket.on("leave_chat_room", (chatId: string) => {
            socket.leave(`chat:${chatId}`)
            console.log(`User ${socket.id} left room: ${chatId}`)
        })

        socket.on("new_message", async (message: Message) => {
            console.log("🚀 ~ socket.on ~ message:", message)
            const { _id, recipientIds, chatId, content } = message

            const sentMessage = await sendMessage({
                _id,
                chatId,
                senderId: userId,
                content,
            })

            await updateChat(chatId, {
                latestMessage: sentMessage._id,
            })

            for (const recipientId of recipientIds) {
                io.to(`user:${recipientId}`).emit("new_message", sentMessage)
            }
        })

        socket.on("typing", async (data: TypingData) => {
            console.log("typing data: ", data)
        })

        socket.on("disconnect", () => {
            console.log(`socket disconnected ${socket.id}`)
        })

        // socket.onAny((event, ...args) => {
        //     console.log("event: ", event, args)
        // })
    })

    return io
}
