import { Fragment } from "react"

import { useGetChats } from "../../api/useGetChats"

import useChatStore from "../../store"
import useUserStore from "../../../auth/store/user"

import { formatParticipantsList } from "../../utils"
import { mergeStyles } from "@/utils/mergeStyles"

import Avatar from "@/components/ui/Avatar"

const ChatPreviewList = () => {
    const activeChatId = useChatStore.use.activeChatId()
    const user = useUserStore.use.user()
    const setToActiveChat = useChatStore.use.setToActiveChat()

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
                                onClick={() => setToActiveChat(chat._id)}
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
