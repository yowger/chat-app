import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/ChatSidebar"

import { useCreateChat } from "../api/useCreateChat"
import { useSendMessage } from "@/features/messages/api/useSendMessage"

import useChatStore from "../store"

import MessageList from "@/features/messages/components/MessageList"
import RecipientSelector from "../components/RecipientSelector"

export default function Chat() {
    const activeChatId = useChatStore.use.activeChatId()
    const recipients = useChatStore.use.recipients()
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const isCreatingChatSelected = useChatStore.use.isCreatingChatSelected()
    const setActiveChat = useChatStore.use.setToActiveChat()
    const removeRecipient = useChatStore.use.removeRecipient()
    const resetNewChat = useChatStore.use.resetNewChat()

    const { mutate: mutateChat, isPending: isChatPending } = useCreateChat()
    const { mutate: mutateMessage, isPending: isMessagePending } =
        useSendMessage()

    const handleSendMessage = (text: string) => {
        const shouldCreateNewChat: boolean =
            recipients.length > 0 &&
            isCreatingChat &&
            isCreatingChatSelected &&
            !activeChatId

        if (shouldCreateNewChat) {
            const recipientIds = recipients.map((recipient) => recipient._id)

            mutateChat(
                { input: { participants: recipientIds } },
                {
                    onSuccess: (data) => {
                        resetNewChat()
                        setActiveChat(data._id)
                    },
                }
            )

            return
        }

        if (activeChatId) {
            mutateMessage(
                {
                    input: {
                        chatId: activeChatId,
                        content: text,
                    },
                },
                {
                    onSettled: (data) => {
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
                        disabled={isChatPending || isMessagePending}
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
