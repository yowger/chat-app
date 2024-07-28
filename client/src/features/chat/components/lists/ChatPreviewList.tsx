import { Fragment, useEffect, useRef } from "react"

import { useGetChats } from "../../api/useGetChats"

import useChatStore from "../../store"
import useUserStore from "../../../auth/store/user"

import useSocketContext from "@/features/socket/contexts/useSocketContext"

import { formatParticipantsList } from "../../utils"
import { mergeStyles } from "@/utils/mergeStyles"

import Avatar from "@/components/ui/Avatar"

import type { Recipient } from "../../types/User"

const ChatPreviewList = () => {
    const activeChatId = useChatStore.use.activeChatId()
    const user = useUserStore.use.user()
    const setToActiveChat = useChatStore.use.setToActiveChat()
    const setRecipients = useChatStore.use.setRecipients()

    const { socket } = useSocketContext()
    const prevChatIdRef = useRef<string | null>(null)

    useEffect(() => {
        if (!socket) return

        if (prevChatIdRef.current) {
            console.log("leaving room")
            socket.emit("leave_chat_room", prevChatIdRef.current)
        }

        if (activeChatId) {
            console.log("joining room")
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

    return (
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={`chat-preview-list-${pageIndex}`}>
                    {page.chats.map((chat, chatIndex) => {
                        const latestMessage = chat.latestMessage?.content
                        const isCurrentChat = activeChatId === chat._id

                        const participantsWithoutUser =
                            chat.participants.filter(
                                (participant) => participant._id !== user?._id
                            )

                        const chatName =
                            formatParticipantsList(participantsWithoutUser) ||
                            "Unknown"

                        return (
                            <li
                                key={`chat-preview-item-${chat._id}`}
                                onClick={() =>
                                    handleClickChatItem(
                                        chat._id,
                                        chat.participants
                                    )
                                }
                                className={mergeStyles(
                                    "flex items-center overflow-hidden p-1.5 rounded-md cursor-pointer min-w-0",
                                    isCurrentChat
                                        ? "bg-blue-100"
                                        : "hover:bg-gray-600/10"
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
                                            <a
                                                className="z-10 flex items-center justify-center size-7 text-xs font-medium text-white bg-zinc-600 border border-white rounded-full hover:bg-gray-600"
                                                href="#"
                                            >
                                                +{chat.participants.length - 1}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="font-medium truncate">
                                        {chatName}
                                    </p>
                                    <p className="text-sm font-medium text-gray-500 truncate">
                                        {latestMessage
                                            ? latestMessage
                                            : "No messages yet"}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </Fragment>
            ))}
        </ul>
    )
}

export default ChatPreviewList
