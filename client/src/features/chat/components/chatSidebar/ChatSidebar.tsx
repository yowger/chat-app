import { useState } from "react"

import { Button } from "@/components/ui/button/Button"
import { IconEdit } from "@tabler/icons-react"

import ContactPreviewContainer from "../contactPreview/Container"
import ContactPreviewAvatar from "../contactPreview/Avatar"
import ContactPreviewInfo from "../contactPreview/Info"
import ContactPreviewUserName from "../contactPreview/Name"
import ContactPreviewMessage from "../contactPreview/Message"
import NewChatDialog from "../newChat/NewChatDialog"

import { useLogout } from "@/features/auth/api/useLogout"

export default function ChatSidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const { mutate, isPending } = useLogout()

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
                    <ContactPreviewContainer>
                        <ContactPreviewAvatar
                            src="https://picsum.photos/200/300"
                            isOnline={false}
                        />
                        <ContactPreviewInfo className="hidden md:flex md: flex-col">
                            <ContactPreviewUserName>
                                James Macagba
                            </ContactPreviewUserName>
                            <ContactPreviewMessage>
                                Lorem ipsum dolor sit amet
                            </ContactPreviewMessage>
                        </ContactPreviewInfo>
                    </ContactPreviewContainer>

                    <ContactPreviewContainer>
                        <ContactPreviewAvatar
                            src="https://picsum.photos/200/300"
                            isOnline={true}
                        />
                        <ContactPreviewInfo>
                            <ContactPreviewUserName>
                                Ray Sealana
                            </ContactPreviewUserName>
                            <ContactPreviewMessage>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Culpa quod exercitationem odio
                                earum esse doloremque vero rem fugit sed ad
                                unde, veritatis a magni ipsum nobis doloribus,
                                corporis non atque!
                            </ContactPreviewMessage>
                        </ContactPreviewInfo>
                    </ContactPreviewContainer>

                    <ContactPreviewContainer>
                        <ContactPreviewAvatar
                            src="https://picsum.photos/200/300"
                            isOnline={true}
                        />
                        <ContactPreviewInfo>
                            <ContactPreviewUserName>
                                Roger Pantil
                            </ContactPreviewUserName>
                            <ContactPreviewMessage>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Nulla id laudantium laboriosam
                                doloremque veritatis cum neque iure nam dolorem
                                nisi! Fuga esse a nisi voluptate laboriosam
                                earum iste id aut?
                            </ContactPreviewMessage>
                        </ContactPreviewInfo>
                    </ContactPreviewContainer>
                </section>
            </aside>

            <NewChatDialog isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}
