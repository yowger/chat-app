import { mergeStyles } from "@/utils/mergeStyles"

import type { FC, PropsWithChildren } from "react"

interface ContactPreviewInfoProps extends PropsWithChildren {
    className?: string
}

const ContactPreviewInfo: FC<ContactPreviewInfoProps> = ({
    className,
    children,
}) => {
    return <div className={mergeStyles("min-w-0", className)}>{children}</div>
}

export default ContactPreviewInfo
