import type { FC, PropsWithChildren } from "react"

interface ChatPreviewMessageProps extends PropsWithChildren {}

const ChatPreviewMessage: FC<ChatPreviewMessageProps> = ({ children }) => {
    return <div className="text-sm text-gray-500 truncate">{children}</div>
}

export default ChatPreviewMessage
