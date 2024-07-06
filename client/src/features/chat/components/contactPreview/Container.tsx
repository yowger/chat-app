import { mergeStyles } from "@/utils/mergeStyles"
import { FC } from "react"

import type { PropsWithChildren } from "react"

interface ContactPreviewContainerProps extends PropsWithChildren {}

const ContactPreviewContainer: FC<ContactPreviewContainerProps> = ({
    children,
}) => {
    return (
        <div
            className={mergeStyles(
                "flex items-center overflow-hidden hover:bg-gray-600/10 p-1.5 rounded-md cursor-pointer min-w-0"
            )}
        >
            {children}
        </div>
    )
}

export default ContactPreviewContainer
