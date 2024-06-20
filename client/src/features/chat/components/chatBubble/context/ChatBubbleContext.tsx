import { createContext } from "react"

import type { FC, PropsWithChildren } from "react"

export interface ChatBubbleContext {
    reverse?: boolean
}

export const ChatBubbleContext = createContext<ChatBubbleContext | undefined>(
    undefined
)

interface ChatBubbleProviderProps extends PropsWithChildren {
    reverse?: boolean
}

export const ChatBubbleProvider: FC<ChatBubbleProviderProps> = ({
    reverse = false,
    children,
}) => (
    <ChatBubbleContext.Provider value={{ reverse }}>
        {children}
    </ChatBubbleContext.Provider>
)
