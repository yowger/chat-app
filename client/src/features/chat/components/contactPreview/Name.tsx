import { mergeStyles } from "@/utils/mergeStyles"

import type { FC, HTMLAttributes } from "react"

interface ContactPreviewUserNameProps
    extends HTMLAttributes<HTMLParagraphElement> {}

const ContactPreviewUserName: FC<ContactPreviewUserNameProps> = ({
    children,
    className,
    ...restProps
}) => {
    return (
        <p
            className={mergeStyles("font-medium truncate", className)}
            {...restProps}
        >
            {children}
        </p>
    )
}

export default ContactPreviewUserName
