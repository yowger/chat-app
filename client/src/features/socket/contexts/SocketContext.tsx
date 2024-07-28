import { createContext, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

import useAuthStore from "@/features/auth/store/auth"

import type { ReactNode } from "react"
import type { Socket } from "socket.io-client"

interface SocketContextType {
    socket: Socket | null
    isConnected: boolean
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const socketUrl = "http://localhost:8000"
    const [isConnected, setIsConnected] = useState(false)

    const { accessToken } = useAuthStore.use.auth()
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if (!accessToken) return

        socketRef.current = io(socketUrl, {
            extraHeaders: {
                authorization: `bearer ${accessToken}`,
            },
        })

        socketRef.current.on("connect", () => {
            console.log("Socket connected:")
            setIsConnected(true)
        })

        socketRef.current.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason)
            setIsConnected(false)
        })

        socketRef.current.on("connect_error", (error) => {
            console.error("Socket connection error:", error)
        })

        return () => {
            socketRef.current?.disconnect()
        }
    }, [accessToken])

    return (
        <SocketContext.Provider
            value={{ socket: socketRef.current, isConnected }}
        >
            {children}
        </SocketContext.Provider>
    )
}
