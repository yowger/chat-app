import Badge from "@/components/Badge"

import type { FC } from "react"
import type { Recipient } from "../types/User"

interface RecipientSelectorProps {
    recipients: Recipient[]
    onRemoveRecipient: (recipientId: string) => void
}

const RecipientSelector: FC<RecipientSelectorProps> = ({
    recipients,
    onRemoveRecipient,
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {recipients.map((recipient) => (
                <Badge
                    key={`recipient-item-${recipient._id}`}
                    label={recipient.username}
                    onRemove={() => onRemoveRecipient(recipient._id)}
                />
            ))}
        </div>
    )
}

export default RecipientSelector
