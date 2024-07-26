import { Server as SocketIOServer } from "socket.io"

import { findUserById } from "@/services/userSvc"

import { allowedOriginsArray } from "@/utils/origin"
import { verifyJwt } from "@/utils/jwt"

import type { Server as HttpServer } from "http"
import type { Request } from "express"
import type { Socket } from "socket.io"

interface ChatUser {
    id: string
    username: string
}

interface SocketRequest extends Request, ChatUser {
    _query: Record<string, string>
    user: ChatUser
}

export const connectSocket = (server: HttpServer) => {
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

    // todo set up handle error middleware

    const setupSocketHandlers = () => {
        io.on("connect", (socket: Socket) => {
            const req = socket.request as Request & { user: ChatUser }

            console.log(`socket connected ${socket.id}`)

            console.log("socket user: ", req.user.username)

            socket.on("new_message", async (messageData: string) => {
                socket.broadcast.emit("new_message", messageData)
            })

            socket.on("disconnect", () => {
                console.log(`socket disconnected ${socket.id}`)
            })
        })
    }

    setupSocketHandlers()

    return io
}
