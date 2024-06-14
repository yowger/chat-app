export interface AvatarProps {
    src: string
    alt?: string
    size?: "small" | "medium" | "large"
    isOnline?: boolean
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
}: AvatarProps) => {
    return (
        <div className="relative">
            <img
                className={`rounded-full ${sizeClasses[size]}`}
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
