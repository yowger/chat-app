import { useGetMessages } from "../api/useGetMessages"

import ChatBubbleContainerProps from "@/features/chat/components/chatBubble/Container"
import ChatBubbleAvatar from "@/features/chat/components/chatBubble/Avatar"
import ChatBubbleContent from "@/features/chat/components/chatBubble/Content"
import ChatBubbleHeader from "@/features/chat/components/chatBubble/Header"
import ChatBubbleActions from "@/features/chat/components/chatBubble/Actions"

import { ChatBubbleProvider } from "../components/chatBubble/context/ChatBubbleContext"

import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/chatSidebar/ChatSidebar"
import { Fragment } from "react/jsx-runtime"

const menuItems = [
    { label: "Reply", onClick: () => console.log("Reply clicked") },
    { label: "Copy", onClick: () => console.log("Copy clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
]

export default function Chat() {
    const { data, isLoading, isError, error } = useGetMessages({
        query: {
            chatId: "669018e5c390d6065bda4d3c",
        },
    })

    console.log("🚀 ~ Chat ~ data:", data)
    return (
        <div className="flex">
            <ChatSidebar />
            <main className="flex-1 md:flex h-screen relative">
                <ChatHeader />
                <main className="flex-1 flex h-screen relative">
                    <div className="mt-16 flex flex-col w-full lg:w-[70%] bg-gray-300 justify-between">
                        <section className="space-y-4 px-4 py-4">
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error: {error.message}</p>}
                            {data?.pages.map((page, pageIndex) => (
                                <Fragment key={pageIndex}>
                                    {page?.messages.map((message) => {
                                        return (
                                            <ChatBubbleProvider
                                                key={message._id}
                                                reverse={
                                                    message.sender._id ===
                                                    // currentUser._id
                                                    "Asdasd"
                                                }
                                            >
                                                <ChatBubbleContainerProps>
                                                    <ChatBubbleAvatar
                                                        src="https://picsum.photos/200/300"
                                                        alt={
                                                            message.sender
                                                                .username
                                                        }
                                                    />
                                                    <ChatBubbleContent>
                                                        <ChatBubbleHeader
                                                            name={
                                                                message.sender
                                                                    .username
                                                            }
                                                            time={new Date(
                                                                message.createdAt
                                                            ).toLocaleTimeString()}
                                                        />
                                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                                            {message.content}
                                                        </p>
                                                    </ChatBubbleContent>
                                                    <ChatBubbleActions
                                                        items={menuItems}
                                                    />
                                                </ChatBubbleContainerProps>
                                            </ChatBubbleProvider>
                                        )
                                    })}
                                </Fragment>
                            ))}
                        </section>

                        <ChatInput />
                    </div>

                    <div className="p-6 hidden mt-16 lg:flex lg:w-[30%] bg-gray-400 min-h-[45%]">
                        <p>other side</p>
                    </div>
                </main>
            </main>
        </div>
    )
}

/*
between sections
<ChatBubbleProvider reverse={false}>
                                <ChatBubbleContainerProps>
                                    <ChatBubbleAvatar
                                        src="https://picsum.photos/200/300"
                                        alt="John Doe"
                                    />
                                    <ChatBubbleContent>
                                        <ChatBubbleHeader
                                            name="Bonnie Green"
                                            time="11:46"
                                        />
                                        <p className="text-sm font-normal py-2.5 text-gray-900">
                                            That's awesome. I think our users
                                            will really appreciate the
                                            improvements.
                                        </p>
                                    </ChatBubbleContent>
                                    <ChatBubbleActions items={menuItems} />
                                </ChatBubbleContainerProps>
                            </ChatBubbleProvider>

                            <p className="text-sm text-gray-500 flex justify-center">
                                Jun 4, 2024
                            </p>

                            <ChatBubbleProvider reverse={true}>
                                <ChatBubbleContainerProps>
                                   <ChatBubbleAvatar
                                        src="https://picsum.photos/200/300"
                                        alt="John Doe"
                                    /> *
                                    <ChatBubbleContent>
                                        <ChatBubbleHeader
                                            name="Bonnie Green"
                                            time="11:46"
                                        />
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit.
                                            Voluptate commodi, velit impedit
                                            earum accusantium incidunt sunt
                                            dolorum expedita vero cum. Quod
                                        </p>
                                    </ChatBubbleContent>
                                    <ChatBubbleActions items={menuItems} />
                                </ChatBubbleContainerProps>
                            </ChatBubbleProvider>

*/
