import { useChatBubbleContext } from "./hooks/useChatBubbleContext"

import { mergeStyles } from "@/utils/mergeStyles"

import type { ReactNode } from "react"

interface ChatBubbleContentProps {
    children: ReactNode
}

const ChatBubbleContent = ({ children }: ChatBubbleContentProps) => {
    const { reverse } = useChatBubbleContext()

    return (
        <div
            className={mergeStyles(
                "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 dark:bg-gray-700",
                reverse
                    ? "rounded-s-xl rounded-br-xl"
                    : "rounded-e-xl rounded-es-xl"
            )}
        >
            {children}
        </div>
    )
}

export default ChatBubbleContent
