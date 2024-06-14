import { createContext } from "react"

import type { ReactNode } from "react"

export interface ChatBubbleContext {
    reverse?: boolean
}

export const ChatBubbleContext = createContext<ChatBubbleContext | undefined>(
    undefined
)

interface ChatBubbleProviderProps {
    reverse?: boolean
    children: ReactNode
}

export const ChatBubbleProvider = ({
    reverse = false,
    children,
}: ChatBubbleProviderProps) => (
    <ChatBubbleContext.Provider value={{ reverse }}>
        {children}
    </ChatBubbleContext.Provider>
)
