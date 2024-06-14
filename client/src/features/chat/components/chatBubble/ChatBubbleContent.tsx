import type { ReactNode } from "react"

interface ChatBubbleContentProps {
    children: ReactNode
}

const ChatBubbleContent = ({ children }: ChatBubbleContentProps) => (
    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        {children}
    </div>
)

export default ChatBubbleContent
