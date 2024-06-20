import type { FC, PropsWithChildren } from "react"

interface ChatPreviewInfoProps extends PropsWithChildren {}

const ChatPreviewInfo: FC<ChatPreviewInfoProps> = ({ children }) => {
    return (
        <div className="font-medium hidden md:flex md: flex-col">
            {children}
        </div>
    )
}

export default ChatPreviewInfo
