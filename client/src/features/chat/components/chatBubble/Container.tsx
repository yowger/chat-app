import { mergeStyles } from "@/utils/mergeStyles"

import { useChatBubbleContext } from "./hooks/useChatBubbleContext"

import type { FC, PropsWithChildren } from "react"

interface ChatBubbleContainerProps extends PropsWithChildren {}

const ChatBubbleContainer: FC<ChatBubbleContainerProps> = ({ children }) => {
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

export default ChatBubbleContainer
