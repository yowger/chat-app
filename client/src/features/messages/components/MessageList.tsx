import { format } from "date-fns"

import { useGetMessages } from "@/features/messages/api/useGetMessages"

import useUserStore from "@/features/auth/store/user"
import useChatStore from "@/features/chat/store"

import { mergeStyles } from "@/utils/mergeStyles"

import Avatar from "@/components/ui/Avatar"

import type { Message } from "@/features/messages/api/useGetMessages"

// const menuItems = [
//     { label: "Reply", onClick: () => console.log("Reply clicked") },
//     { label: "Copy", onClick: () => console.log("Copy clicked") },
//     { label: "Delete", onClick: () => console.log("Delete clicked") },
// ]

interface MessageListProps {
    messages: Message[]
}

const MessageList = (props: MessageListProps) => {
    const { messages } = props
    
    const activeChatId = useChatStore.use.activeChatId()
    const user = useUserStore.use.user()

    const { data, isLoading } = useGetMessages({
        query: {
            chatId: activeChatId,
        },
    })

    const isEmptyMessage = messages.length === 0

    if (!data) {
        return <p>Start a conversation to see messages</p>
    }

    if (isEmptyMessage) {
        return <p>Send a message to start the conversation</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ul className="space-y-4">
            {messages.map((message) => {
                const isUser = user!._id === message.sender._id
                const isRecipient = !isUser
                const time = format(message.createdAt, "h:mm aaaaa'm'")

                return (
                    <li
                        key={`message-item-${message._id}`}
                        className={mergeStyles(
                            "relative flex items-start gap-2.5",
                            isUser && "flex-row-reverse"
                        )}
                    >
                        {isRecipient && (
                            <Avatar
                                src="https://picsum.photos/200/300"
                                size="small"
                                alt={message.sender.username}
                            />
                        )}
                        <div className="flex flex-col w-full max-w-[320px] overflow-hidden">
                            <div
                                className={mergeStyles(
                                    "border-gray-200 leading-1.5 p-4",
                                    isUser
                                        ? "bg-blue-500 rounded-s-xl rounded-br-xl"
                                        : "bg-gray-100 rounded-e-xl rounded-es-xl"
                                )}
                            >
                                {isRecipient && (
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {message.sender.username}
                                        </span>
                                    </div>
                                )}
                                <p
                                    className={mergeStyles(
                                        "text-sm font-normal py-2",
                                        isUser ? "text-white" : "text-gray-900"
                                    )}
                                >
                                    {message.content}
                                </p>
                            </div>
                            <div
                                className={mergeStyles(
                                    "mt-1.5 flex text-sm text-gray-500",
                                    isUser && "flex-row-reverse"
                                )}
                            >
                                {time}
                            </div>
                        </div>
                        {/* <ChatBubbleActions
                                    items={menuItems}
                                /> */}
                    </li>
                )
            })}
        </ul>
    )
}

export default MessageList
