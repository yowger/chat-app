import MessagePreview from "./MessagePreview"

import NewChatDialog from "../dialogs/NewChatDialog"
import NewMessagePreview from "./NewMessagePreview"
import useChatStore from "../../store"
import SidebarMenu from "./Menu"

export default function ChatSidebar() {
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const isCreateChatModalOpen = useChatStore.use.isCreateChatModalOpen()
    const setIsCreateChatModalOpen = useChatStore.use.setIsCreateChatModalOpen()

    const handleCloseModal = () => {
        setIsCreateChatModalOpen(false)
    }

    return (
        <>
            <aside className="flex-none w-16 md:w-80 bg-gray-50 h-screen py-3 overflow-hidden">
                <SidebarMenu />

                <div className="px-3 py-2">
                    <hr className="h-px bg-gray-200 border-0" />
                </div>

                <section className="px-1.5">
                    {isCreatingChat && <NewMessagePreview />}
                    <MessagePreview />
                </section>
            </aside>

            <NewChatDialog
                isOpen={isCreateChatModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
}
