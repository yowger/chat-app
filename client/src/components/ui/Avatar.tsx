import { mergeStyles } from "@/utils/mergeStyles"

import type { Avatar } from "@/types/avatar"

interface AvatarProps extends Avatar {
    className?: string
}

const sizeClasses = {
    small: "w-9 h-9",
    medium: "w-10 h-10",
    large: "w-12 h-12",
}

const Avatar = ({
    src,
    alt = "Profile image",
    size = "medium",
    isOnline = false,
    className,
}: AvatarProps) => {
    return (
        <div className="relative flex-shrink-0">
            <img
                className={mergeStyles(
                    "rounded-full",
                    className,
                    sizeClasses[size]
                )}
                src={src}
                alt={alt}
            />
            {isOnline && (
                <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            )}
        </div>
    )
}

export default Avatar
