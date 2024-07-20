import useChatStore from "../store"

import { mergeStyles } from "@/utils/mergeStyles"

import Avatar from "@/components/ui/Avatar"

import type { Recipient } from "../types/User"

const NewChatPreview = () => {
    const participants = useChatStore.use.recipients()
    const isActive = true

    const generatePreviewMessage = (participants: Recipient[]): string => {
        if (participants.length === 0) {
            return "No participants"
        }

        if (participants.length === 1) {
            return `New message to ${participants[0].username}`
        }

        const usernames = participants
            .slice(0, 2)
            .map((participant) => participant.username)
            .join(", ")
        const otherParticipantsCount = participants.length - 2

        return `New message to ${usernames}${
            otherParticipantsCount > 0
                ? `, and ${otherParticipantsCount} others`
                : ""
        }`
    }

    const previewMessage = generatePreviewMessage(participants)

    return (
        <div
            className={mergeStyles(
                "flex items-center overflow-hidden p-1.5 rounded-md cursor-pointer min-w-0",
                isActive ? "bg-blue-100" : "hover:bg-gray-600/10"
            )}
        >
            <div className="relative flex-shrink-0 mr-2.5">
                <Avatar
                    src="https://picsum.photos/200/300"
                    alt="Profile picture"
                    size="medium"
                />
                {participants.length > 1 && (
                    <div className="absolute bottom-0 -right-1.5">
                        <a
                            className="z-10 flex items-center justify-center size-7 text-xs font-medium text-white bg-zinc-600 border border-white rounded-full hover:bg-gray-600"
                            href="#"
                        >
                            +{participants.length - 1}
                        </a>
                    </div>
                )}
            </div>

            <div className="min-w-0">
                <p className="text-sm font-medium truncate">{previewMessage}</p>
            </div>
        </div>
    )
}

export default NewChatPreview
