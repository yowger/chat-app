import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/ChatSidebar"

import { useCreateChat } from "../api/useCreateChat"

import MessageList from "@/features/messages/components/MessageList"

import // formatParticipantsList,
// generatePreviewName,
"../utils"

import RecipientSelector from "../components/RecipientSelector"
import useChatStore from "../store"

export default function Chat() {
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const isCreatingChatSelected = useChatStore.use.isCreatingChatSelected()
    const recipients = useChatStore.use.recipients()
    const removeRecipient = useChatStore.use.removeRecipient()

    const { mutate, isPending } = useCreateChat()

    const handleSendMessage = (text: string) => {
        const shouldCreateNewChat: boolean =
            isCreatingChat && isCreatingChatSelected && recipients.length > 0

        if (shouldCreateNewChat) {
            const recipientIds = recipients.map((recipient) => recipient._id)

            mutate(
                { input: { participants: recipientIds } },
                {
                    onSuccess: (data) => {
                        console.log("🚀 ~ handleSendMessage ~ data:", data)
                    },
                }
            )
        }
    }

    return (
        <div className="flex">
            <ChatSidebar />
            <main className="flex-1 md:flex h-screen relative">
                <ChatHeader />

                <div className="mt-16 flex flex-col w-full lg:w-[70%] bg-gray-300 justify-between">
                    {isCreatingChat && isCreatingChatSelected && (
                        <div className="flex p-2">
                            <span className="block mr-2 text-sm mt-1">To:</span>
                            <RecipientSelector
                                recipients={recipients}
                                onRemoveRecipient={removeRecipient}
                            />
                        </div>
                    )}

                    <section className="px-4 py-3 overflow-y-auto">
                        <MessageList />
                    </section>

                    <ChatInput
                        onClick={handleSendMessage}
                        disabled={isPending}
                    />
                </div>

                <div className="p-6 hidden mt-16 lg:flex lg:w-[30%] bg-gray-400 min-h-[45%]">
                    <p>other side</p>
                </div>
                {/* </main> */}
            </main>
        </div>
    )
}
