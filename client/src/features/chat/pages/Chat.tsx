import ChatInput from "../components/ChatInput"
import ChatHeader from "../components/ChatHeader"
import ChatSidebar from "../components/ChatSidebar"

import MessageList from "@/features/messages/components/MessageList"

export default function Chat() {
    return (
        <div className="flex">
            <ChatSidebar />
            <main className="flex-1 md:flex h-screen relative">
                <ChatHeader />
                <main className="flex-1 flex h-screen relative">
                    <div className="mt-16 flex flex-col w-full lg:w-[70%] bg-gray-300 justify-between">
                        <section className="px-4 py-3 overflow-y-auto">
                            <MessageList />
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
