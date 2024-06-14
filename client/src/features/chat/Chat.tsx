import Avatar from "@/components/ui/Avatar"

import ChatBubbleWrapper from "@/features/chat/components/chatBubble/ChatBubbleWrapper"
import ChatBubbleAvatar from "@/features/chat/components/chatBubble/ChatBubbleAvatar"
import ChatBubbleContent from "@/features/chat/components/chatBubble/ChatBubbleContent"
import ChatBubbleHeader from "@/features/chat/components/chatBubble/ChatBubbleHeader"
import ChatBubbleActions from "@/features/chat/components/chatBubble/ChatBubbleActions"
import { ChatBubbleProvider } from "./components/chatBubble/context/ChatBubbleContext"

const menuItems = [
    { label: "Reply", onClick: () => console.log("Reply clicked") },
    { label: "Copy", onClick: () => console.log("Copy clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
]

export default function Chat() {
    return (
        <div className="flex">
            <aside className="flex-none w-16 md:w-80 bg-gray-200 h-screen">
                side
            </aside>
            <main className="flex-1 md:flex h-screen relative">
                <section className="px-6 bg-red-200 absolute h-16 w-full flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src="https://picsum.photos/200/300"
                            isOnline={true}
                            size="medium"
                        />

                        <div className="font-medium dark:text-white">
                            <div>John Doe</div>
                        </div>
                    </div>

                    <p>Header End</p>
                </section>

                {/* <main className="relative mt-16 flex flex-col  md:w-[100%] bg-gray-300 p-6"> */}
                <main className="flex-1 flex h-screen relative">
                    <div className="mt-16 flex flex-col w-full lg:w-[70%] bg-gray-300">
                        <div className="space-y-4 p-6">
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
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
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
                        </div>
                    </div>

                    <div className="p-6 hidden mt-16 lg:flex lg:w-[30%] bg-gray-400 min-h-[45%]">
                        <p>other side</p>
                    </div>
                </main>
            </main>
        </div>
    )
}
