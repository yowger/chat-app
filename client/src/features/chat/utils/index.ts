import type { Chat } from "../types/Chat"
import type { ChatUser } from "../types/User"

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
