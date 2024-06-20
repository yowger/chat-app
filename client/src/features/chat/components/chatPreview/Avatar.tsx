import Avatar, { AvatarProps } from "@/components/ui/Avatar"

import type { FC } from "react"

const ChatPreviewAvatar: FC<AvatarProps> = ({
    size = "medium",
    ...restProps
}) => {
    return <Avatar size={size} {...restProps} />
}

export default ChatPreviewAvatar
