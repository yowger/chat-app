import { mergeStyles } from "@/utils/mergeStyles"

import { useChatBubbleContext } from "./hooks/useChatBubbleContext"

import type { ReactNode } from "react"

interface ChatBubbleWrapperProps {
    children: ReactNode
}

const ChatBubbleWrapper = ({ children }: ChatBubbleWrapperProps) => {
    const { reverse } = useChatBubbleContext()

    return (
        <div
            className={mergeStyles(
                "relative flex items-start gap-2.5",
                reverse && "flex-row-reverse"
            )}
        >
            {children}
        </div>
    )
}

export default ChatBubbleWrapper
