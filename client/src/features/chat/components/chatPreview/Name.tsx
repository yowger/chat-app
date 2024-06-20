import type { FC, PropsWithChildren } from "react"

interface ChatPreviewUserNameProps extends PropsWithChildren {}

const ChatPreviewUserName: FC<ChatPreviewUserNameProps> = ({ children }) => {
    return <p className="truncate">{children}</p>
}

export default ChatPreviewUserName
