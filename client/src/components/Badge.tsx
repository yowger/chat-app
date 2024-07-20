import { IconX } from "@tabler/icons-react"

import type { FC } from "react"

interface BadgeProps {
    label: string
    onRemove: () => void
}

const Badge: FC<BadgeProps> = (props: BadgeProps) => {
    const { label, onRemove } = props

    return (
        <span className="text-nowrap inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded cursor-pointer">
            {label}
            <button
                onClick={onRemove}
                className="inline-flex items-center p-1 ms-2  text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
            >
                <IconX size={15} />
            </button>
        </span>
    )
}

export default Badge
