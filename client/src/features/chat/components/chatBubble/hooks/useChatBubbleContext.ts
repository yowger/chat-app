import { useContext } from "react"

import { ChatBubbleContext } from "../context/ChatBubbleContext"

interface ChatBubbleContextProps extends ChatBubbleContext {}

export const useChatBubbleContext = (): ChatBubbleContextProps => {
    const context = useContext(ChatBubbleContext)
    if (context === undefined) {
        throw new Error(
            "useChatBubbleContext must be used within a ChatBubbleProvider"
        )
    }
    return context
}
