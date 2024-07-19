import { Fragment } from "react"

import useChatStore from "../store/chat"

import { useGetChats } from "../api/useGetChats"

import Avatar from "@/components/ui/Avatar"
import useUserStore from "../store/user"
import { mergeStyles } from "@/utils/mergeStyles"

const ChatPreviewList = () => {
    const user = useUserStore.use.user()
    const activeChatSessionId = useChatStore.use.activeChatSessionId()
    const setActiveChatSessionId = useChatStore.use.setActiveChatSessionId()

    const { data, isLoading } = useGetChats()

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={`chat-preview-list-${pageIndex}`}>
                    {page.chats.map((chat, chatIndex) => {
                        const latestMessage = chat.latestMessage?.content
                        const isCurrentChat = activeChatSessionId === chat._id

                        let chatName = "Unknown"

                        if (chat.name) {
                            chatName = chat.name
                        } else if (chat.participants.length === 2) {
                            const participant = chat.participants.find(
                                (participant) => participant._id !== user?._id
                            )

                            chatName = participant!.username
                        }

                        return (
                            <li
                                key={`chat-preview-item-${chat._id}`}
                                onClick={() => setActiveChatSessionId(chat._id)}
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
