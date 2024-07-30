import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/sidebar"

import { useCreateChat } from "../api/useCreateChat"
import { useSendMessage } from "@/features/messages/api/useSendMessage"

import useSocketContext from "@/features/socket/contexts/useSocketContext"
import useChatStore from "../store"
import useUserStore from "@/features/auth/store/user"

import MessageList from "@/features/messages/components/MessageList"
import RecipientSelector from "../components/RecipientSelector"

import type { Message } from "@/features/messages/api/useGetMessages"
import { useDebounceCallback } from "@/hooks/useDebounceCallback"

interface NewMessage {
    _id: string
    chatId: string
    recipientIds: string[]
    content: string
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const { socket, isConnected } = useSocketContext()
    const user = useUserStore.use.user()
    const activeChatId = useChatStore.use.activeChatId()
    const newRecipients = useChatStore.use.recipients()
    // const chatRecipients = useChatStore.use.recipients()
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const isCreatingChatSelected = useChatStore.use.isCreatingChatSelected()
    const setActiveChat = useChatStore.use.setToActiveChat()
    const removeRecipient = useChatStore.use.removeRecipient()
    const resetNewChat = useChatStore.use.resetNewChat()

    const isInCreateChatMode = isCreatingChat && isCreatingChatSelected
    const isInActiveChat = activeChatId

    const { mutate: mutateChat, isPending: isChatPending } = useCreateChat()
    // const { mutate: mutateMessage, isPending: isMessagePending } =
    const { isPending: isMessagePending } = useSendMessage()

    useEffect(() => {
        if (!socket) return

        const newMessage = (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage])
        }

        const typingEvent = (data: {
            chatId: string
            user: {
                _id: string
                username: string
            }
        }) => {
            if (data.user._id === user!._id) return

            setIsTyping(true)

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }

            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false)
            }, 2000)
        }

        socket.on("new_message", newMessage)
        socket.on("typing", typingEvent)

        return () => {
            socket.off("new_message", newMessage)
            socket.off("typing", typingEvent)

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
        }
    }, [socket])

    const handleOnClick = (text: string) => {
        const shouldCreateNewChat: boolean =
            newRecipients.length > 0 &&
            isCreatingChat &&
            isCreatingChatSelected &&
            !activeChatId

        if (shouldCreateNewChat) {
            const recipientIds = newRecipients.map((recipient) => recipient._id)

            mutateChat(
                { input: { content: text, participants: recipientIds } },
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
            const recipientIds = newRecipients
                .filter((recipient) => recipient._id !== user!._id)
                .map((recipient) => recipient._id)

            const newMessage: NewMessage = {
                _id: uuidv4(),
                chatId: activeChatId,
                recipientIds,
                content: text,
            }

            const message: Message = {
                _id: newMessage._id,
                content: text,
                chat: activeChatId,
                sender: {
                    _id: user!._id,
                    username: user!.username,
                },
                readAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            setMessages((prevMessage) => [...prevMessage, message])

            socket?.emit("new_message", newMessage)
        }
    }

    const handleOnChange = () => {
        debounced()
    }

    const handleTypingEvent = () => {
        if (!socket || !isInActiveChat) return

        const typingData = {
            chatId: activeChatId,
            user: {
                _id: user!._id,
                username: user?.username,
            },
        }

        socket.emit("typing", typingData)
    }

    const debounced = useDebounceCallback(handleTypingEvent, 400)

    return (
        <div className="flex">
            <ChatSidebar />
            <main className="flex-1 md:flex h-screen relative">
                <div className="w-full flex flex-col">
                    {isInActiveChat && <ChatHeader />}

                    {isInCreateChatMode && (
                        <div className="flex p-2">
                            <span className="block mr-2 text-sm mt-1">To:</span>
                            <RecipientSelector
                                recipients={newRecipients}
                                onRemoveRecipient={removeRecipient}
                            />
                        </div>
                    )}

                    <section className="block  px-4 py-3 flex-1 overflow-y-auto">
                        <MessageList messages={messages} />
                    </section>

                    {isInActiveChat && (
                        <div>
                            <div className="p-2">
                                {isInActiveChat && isTyping
                                    ? "is typing..."
                                    : null}
                            </div>

                            <ChatInput
                                onChange={handleOnChange}
                                onClick={handleOnClick}
                                disabled={
                                    isChatPending ||
                                    isMessagePending ||
                                    !isConnected
                                }
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
