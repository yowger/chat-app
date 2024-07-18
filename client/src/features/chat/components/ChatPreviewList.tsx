import { Fragment } from "react"

import useChatStore from "../store/chat"

import { useGetChats } from "../api/useGetChats"

import Avatar from "@/components/ui/Avatar"
import useUserStore from "../store/user"

const ChatPreviewList = () => {
    const user = useUserStore.use.user()
    const setActiveChatSessionId = useChatStore.use.setActiveChatSessionId()

    const { data, isLoading } = useGetChats()
    console.log("🚀 ~ ChatPreviewList ~ data:", data)

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={`chat-preview-list-${pageIndex}`}>
                    {page.chats.map((chat) => {
                        const latestMessage = chat.latestMessage?.content
                        const chatName =
                            chat.type === "group"
                                ? chat.name
                                : chat.participants.find(
                                      (participant) =>
                                          participant._id !== user?._id
                                  )?.username || "Unknown"

                        return (
                            <li
                                key={`chat-preview-item-${chat._id}`}
                                onClick={() => setActiveChatSessionId(chat._id)}
                                className="flex items-center overflow-hidden hover:bg-gray-600/10 p-1.5 rounded-md cursor-pointer min-w-0"
                            >
                                <Avatar
                                    src="https://picsum.photos/200/300"
                                    size="medium"
                                    className="mr-4"
                                />
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
