import { Fragment, useEffect, useRef } from "react"
import { formatDistanceToNow } from "date-fns"

import { useGetChats } from "../../api/useGetChats"
import useChatStore from "../../store"
import useUserStore from "../../../auth/store/user"
import useSocketContext from "@/features/socket/contexts/useSocketContext"

import { formatParticipantsList } from "../../utils"
import { mergeStyles } from "@/utils/mergeStyles"

import Avatar from "@/components/ui/Avatar"

import type { Chat } from "../../types/Chat"
import type { Recipient } from "../../types/User"

const MessagePreviewList = () => {
    const prevChatIdRef = useRef<string | null>(null)

    const activeChatId = useChatStore.use.activeChatId()
    const user = useUserStore.use.user()
    const setToActiveChat = useChatStore.use.setToActiveChat()
    const setRecipients = useChatStore.use.setRecipients()

    const { socket } = useSocketContext()

    useEffect(() => {
        if (!socket) return

        if (prevChatIdRef.current) {
            socket.emit("leave_chat_room", prevChatIdRef.current)
        }

        if (activeChatId) {
            socket.emit("join_chat_room", activeChatId)
        }

        prevChatIdRef.current = activeChatId
    }, [socket, activeChatId])

    const { data, isLoading } = useGetChats()

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleClickChatItem = (chatId: string, recipients: Recipient[]) => {
        setToActiveChat(chatId)
        setRecipients(recipients)
    }

    const renderChatListItem = (chat: Chat, chatIndex: number) => {
        const latestMessage = chat.latestMessage
        const isYou = latestMessage?.sender._id === user!._id
        const isCurrentChat = activeChatId === chat._id

        const participantsWithoutUser = chat.participants.filter(
            (participant) => participant._id !== user?._id
        )

        const chatName =
            formatParticipantsList(participantsWithoutUser) || "Unknown"

        const formattedDate = latestMessage?.createdAt
            ? formatDistanceToNow(new Date(latestMessage.createdAt))
            : null

        return (
            <li
                key={`chat-preview-item-${chat._id}`}
                onClick={() => handleClickChatItem(chat._id, chat.participants)}
                className={mergeStyles(
                    "flex items-center overflow-hidden px-1.5 py-1.5 rounded-sm cursor-pointer min-w-0",
                    isCurrentChat ? "bg-blue-100" : "hover:bg-gray-500/10"
                )}
            >
                <div className="relative flex flex-shrink-0 mr-2.5">
                    <Avatar
                        src={`https://picsum.photos/200/300?random=${chatIndex}`}
                        alt="Profile picture"
                        size="medium"
                    />
                    {chat.participants.length > 2 && (
                        <div className="absolute bottom-0 -right-1.5">
                            <span className="z-10 flex items-center justify-center size-[1.563rem] text-xs font-medium text-white bg-slate-500 border border-white rounded-full hover:bg-gray-600">
                                +{chat.participants.length - 1}
                            </span>
                        </div>
                    )}
                </div>

                <div className="w-full overflow-hidden">
                    <span className="font-medium text-sm truncate block">
                        {chatName}
                    </span>

                    <div className="w-full text-sm font-medium text-gray-600 flex items-center">
                        {latestMessage?.content ? (
                            <div className="flex w-full">
                                <div className="flex flex-1 overflow-hidden">
                                    {isYou ? (
                                        <span className="text-sm">You:</span>
                                    ) : (
                                        <span className="text-sm">
                                            {chat.participants.length > 2 &&
                                                latestMessage.sender.username +
                                                    ":"}
                                        </span>
                                    )}
                                    <span className="text-sm ml-1 inline-block w-full truncate">
                                        {latestMessage.content}
                                    </span>
                                </div>

                                <span className="text-sm ml-2 flex-shrink-0 text-gray-500">
                                    {formattedDate}
                                </span>
                            </div>
                        ) : (
                            <span>No messages yet</span>
                        )}
                    </div>
                </div>
            </li>
        )
    }

    return (
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={`chat-preview-list-${pageIndex}`}>
                    {page.chats.map((chat, chatIndex) =>
                        renderChatListItem(chat, chatIndex)
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

export default MessagePreviewList
