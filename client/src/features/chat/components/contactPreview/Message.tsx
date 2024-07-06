import type { FC, PropsWithChildren } from "react"

interface ContactPreviewMessageProps extends PropsWithChildren {}

const ContactPreviewMessage: FC<ContactPreviewMessageProps> = ({
    children,
}) => {
    return (
        <div className="text-sm font-medium text-gray-500 truncate ">
            {children}
        </div>
    )
}

export default ContactPreviewMessage
