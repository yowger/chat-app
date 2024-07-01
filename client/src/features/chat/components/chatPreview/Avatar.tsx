import Avatar from "@/components/ui/Avatar"

import type { FC } from "react"
import type { Avatar as AvatarType } from "@/types/avatar"

interface AvatarProps extends AvatarType {}

const ChatPreviewAvatar: FC<AvatarProps> = ({
    size = "medium",
    ...restProps
}) => {
    return <Avatar size={size} {...restProps} />
}

export default ChatPreviewAvatar
