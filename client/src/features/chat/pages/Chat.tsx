import ChatBubbleWrapper from "@/features/chat/components/chatBubble/ChatBubbleWrapper"
import ChatBubbleAvatar from "@/features/chat/components/chatBubble/ChatBubbleAvatar"
import ChatBubbleContent from "@/features/chat/components/chatBubble/ChatBubbleContent"
import ChatBubbleHeader from "@/features/chat/components/chatBubble/ChatBubbleHeader"
import ChatBubbleActions from "@/features/chat/components/chatBubble/ChatBubbleActions"
import { ChatBubbleProvider } from "../components/chatBubble/context/ChatBubbleContext"

import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/ChatSidebar"

const menuItems = [
    { label: "Reply", onClick: () => console.log("Reply clicked") },
    { label: "Copy", onClick: () => console.log("Copy clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
]

export default function Chat() {
    return (
        <div className="flex">
            <ChatSidebar />
            <main className="flex-1 md:flex h-screen relative">
                <ChatHeader />

                {/* <main className="relative mt-16 flex flex-col  md:w-[100%] bg-gray-300 p-6"> */}
                <main className="flex-1 flex h-screen relative">
                    <div className="mt-16 flex flex-col w-full lg:w-[70%] bg-gray-300 justify-between">
                        <section className="space-y-4 px-4 py-4">
                            <ChatBubbleProvider reverse={false}>
                                <ChatBubbleWrapper>
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
                                </ChatBubbleWrapper>
                            </ChatBubbleProvider>

                            <ChatBubbleProvider reverse={true}>
                                <ChatBubbleWrapper>
                                    <ChatBubbleAvatar
                                        src="https://picsum.photos/200/300"
                                        alt="John Doe"
                                    />
                                    <ChatBubbleContent>
                                        <ChatBubbleHeader
                                            name="Bonnie Green"
                                            time="11:46"
                                        />
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                            That's awesome. I think our users
                                            will really appreciate the
                                            improvements.
                                        </p>
                                    </ChatBubbleContent>
                                    <ChatBubbleActions items={menuItems} />
                                </ChatBubbleWrapper>
                            </ChatBubbleProvider>
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
