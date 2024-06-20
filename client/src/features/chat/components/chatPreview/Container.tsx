import { FC } from "react"

import type { PropsWithChildren } from "react"

interface ChatPreviewContainerProps extends PropsWithChildren {}

const ChatPreviewContainer: FC<ChatPreviewContainerProps> = ({ children }) => {
    return (
        <div className="flex items-center gap-4 overflow-hidden">
            {children}
        </div>
    )
}

export default ChatPreviewContainer
