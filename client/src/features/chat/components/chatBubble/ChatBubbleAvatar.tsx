import Avatar, { AvatarProps } from "@/components/ui/Avatar"

const ChatBubbleAvatar = ({ size = "small", ...restProps }: AvatarProps) => {
    return <Avatar size={size} {...restProps} />
}

export default ChatBubbleAvatar
