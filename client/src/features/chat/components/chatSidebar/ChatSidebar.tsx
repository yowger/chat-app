import { Button } from "@/components/ui/button/Button"
import { IconEdit } from "@tabler/icons-react"

import ChatPreviewContainer from "../chatPreview/Container"
import ChatPreviewAvatar from "../chatPreview/Avatar"
import ChatPreviewInfo from "../chatPreview/Info"
import ChatPreviewUserName from "../chatPreview/Name"
import ChatPreviewMessage from "../chatPreview/Message"

import { useLogout } from "@/features/auth/api/useLogout"

export default function ChatSidebar() {
    const { mutate, isPending } = useLogout()

    const handleLogout = () => {
        mutate()
    }

    return (
        <aside className="flex-none w-16 md:w-80 bg-gray-200 h-screen p-3 overflow-hidden">
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

            <section className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-500">Chats</h2>

                <Button className="size-9 p-0" roundness="full">
                    <IconEdit size={18} />
                </Button>
            </section>

            <section className="space-y-3">
                <ChatPreviewContainer>
                    <ChatPreviewAvatar
                        src="https://picsum.photos/200/300"
                        isOnline={false}
                    />
                    <ChatPreviewInfo>
                        <ChatPreviewUserName>James Macagba</ChatPreviewUserName>
                        <ChatPreviewMessage>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eligendi quod veniam dolorem, quasi ducimus
                            dicta explicabo autem blanditiis adipisci tenetur.
                        </ChatPreviewMessage>
                    </ChatPreviewInfo>
                </ChatPreviewContainer>

                <ChatPreviewContainer>
                    <ChatPreviewAvatar
                        src="https://picsum.photos/200/300"
                        isOnline={true}
                    />
                    <ChatPreviewInfo>
                        <ChatPreviewUserName>Ray Sealana</ChatPreviewUserName>
                        <ChatPreviewMessage>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Culpa quod exercitationem odio earum esse
                            doloremque vero rem fugit sed ad unde, veritatis a
                            magni ipsum nobis doloribus, corporis non atque!
                        </ChatPreviewMessage>
                    </ChatPreviewInfo>
                </ChatPreviewContainer>

                <ChatPreviewContainer>
                    <ChatPreviewAvatar
                        src="https://picsum.photos/200/300"
                        isOnline={true}
                    />
                    <ChatPreviewInfo>
                        <ChatPreviewUserName>Roger Pantil</ChatPreviewUserName>
                        <ChatPreviewMessage>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nulla id laudantium laboriosam doloremque
                            veritatis cum neque iure nam dolorem nisi! Fuga esse
                            a nisi voluptate laboriosam earum iste id aut?
                        </ChatPreviewMessage>
                    </ChatPreviewInfo>
                </ChatPreviewContainer>
            </section>
        </aside>
    )
}
