import Avatar, { AvatarProps } from "@/components/ui/Avatar"

import type { FC } from "react"

const ChatBubbleAvatar: FC<AvatarProps> = ({
    size = "small",
    ...restProps
}) => {
    return <Avatar size={size} {...restProps} />
}

export default ChatBubbleAvatar
