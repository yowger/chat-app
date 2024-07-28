import { useState } from "react"

import { IconEdit } from "@tabler/icons-react"

import { useLogout } from "@/features/auth/api/useLogout"

import { Button } from "@/components/ui/button/Button"
import ChatPreviewList from "./lists/ChatPreviewList"
import NewChatDialog from "./dialogs/NewChatDialog"
import NewChatPreview from "./NewChatPreview"
import useChatStore from "../store"

export default function ChatSidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isCreatingChat = useChatStore.use.isCreatingChat()

    const { mutate, isPending } = useLogout()

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleLogout = () => {
        mutate()
    }

    return (
        <>
            <aside className="flex-none w-16 md:w-80 bg-gray-200 h-screen py-3 overflow-hidden">
                <section className="flex justify-between items-center mb-4">
                    profile section
                    <Button
                        size="small"
                        onClick={handleLogout}
                        disabled={isPending}
                    >
                        Log out
                    </Button>
                </section>

                <section className="px-3 mb-2 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-500">Chats</h2>

                    <Button
                        onClick={handleOpenModal}
                        className="size-9 p-0"
                        roundness="full"
                    >
                        <IconEdit size={18} />
                    </Button>
                </section>

                <section className="px-1.5">
                    {isCreatingChat && <NewChatPreview />}
                    <ChatPreviewList />
                </section>
            </aside>

            <NewChatDialog isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}
