import { mergeStyles } from "@/utils/mergeStyles"
import type { ReactNode } from "react"

interface ChatBubbleWrapperProps {
    reverse?: boolean
    children: ReactNode
}

const ChatBubbleWrapper = ({
    reverse = false,
    children,
}: ChatBubbleWrapperProps) => (
    <div
        className={mergeStyles(
            "relative flex items-start gap-2.5",
            reverse && "flex-row-reverse"
        )}
    >
        {children}
    </div>
)

export default ChatBubbleWrapper
