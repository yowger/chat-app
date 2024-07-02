import Avatar from "@/components/ui/Avatar"
import type { Avatar as AvatarType } from "@/types/avatar"

import type { FC } from "react"

interface ChatBubbleAvatarProps extends AvatarType {}

const ChatBubbleAvatar: FC<ChatBubbleAvatarProps> = ({
    size = "small",
    ...restProps
}) => {
    return <Avatar size={size} {...restProps} />
}

export default ChatBubbleAvatar
