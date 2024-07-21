import type { Chat, ChatType } from "../types/Chat"
import type { ChatUser, Recipient } from "../types/User"

export const getChatType = (recipients: Recipient[]): ChatType | "empty" => {
    if (recipients.length === 0) return "empty"
    if (recipients.length === 1) return "single"

    return "group"
}

export const formatParticipantsList = (
    participants: Recipient[]
): string | undefined => {
    if (participants.length === 0) {
        return undefined
    }

    if (participants.length === 1) {
        return participants[0].username
    }

    if (participants.length === 2) {
        return `${participants[0].username} and ${participants[1].username}`
    }

    const usernames = participants
        .slice(0, 2)
        .map((participant) => participant.username)
        .join(", ")

    const otherParticipantsCount = participants.length - 2

    return `${usernames}${
        otherParticipantsCount > 0
            ? `, and ${otherParticipantsCount} others`
            : ""
    }`
}

export const generatePreviewName = (participants: Recipient[]): string => {
    const previewName = formatParticipantsList(participants)

    if (!previewName) {
        return "No participants"
    }

    const participantsList = formatParticipantsList(participants)

    return `New message to ${participantsList}`
}

export const getSingleChatParticipant = (
    chat: Chat,
    userId: string
): ChatUser | undefined => {
    if (chat.type === "single") {
        const participant = chat.participants.find(
            (participant) => participant._id !== userId
        )

        return participant
    }

    return undefined
}
