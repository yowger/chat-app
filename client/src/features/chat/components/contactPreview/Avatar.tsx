import Avatar from "@/components/ui/Avatar"

import type { FC } from "react"
import type { Avatar as AvatarType } from "@/types/avatar"

interface ContactPreviewAvatarProps extends AvatarType {
    className?: string
}

const ContactPreviewAvatar: FC<ContactPreviewAvatarProps> = ({
    size = "medium",
    className = "mr-4",
    ...restProps
}) => {
    return <Avatar size={size} className={className} {...restProps} />
}

export default ContactPreviewAvatar
