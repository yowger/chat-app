import { mergeStyles } from "@/utils/mergeStyles"

import type { Avatar } from "@/types/avatar"

interface AvatarProps extends Avatar {
    className?: string
}

const sizeClasses = {
    tiny: "size-7",
    small: "size-9",
    medium: "size-10",
    large: "size-12",
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
                    "rounded-full border-2",
                    className,
                    sizeClasses[size]
                )}
                src={src}
                alt={alt}
            />
            {isOnline && (
                <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border border-white dark:border-gray-800 rounded-full"></span>
            )}
        </div>
    )
}

export default Avatar
