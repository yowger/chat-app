import Avatar from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { IconEdit } from "@tabler/icons-react"

export default function ChatSidebar() {
    return (
        <aside className="flex-none w-16 md:w-80 bg-gray-200 h-screen p-3">
            <section className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-500">Chats</h2>

                <Button className="size-9 p-0" roundness="full">
                    <IconEdit size={18} />
                </Button>
            </section>
            <section className="space-y-3">
                <div className="flex items-center gap-4">
                    <Avatar
                        src="https://picsum.photos/200/300"
                        isOnline={true}
                        size="medium"
                    />

                    <div className="font-medium hidden md:flex">
                        <div>James Macagba</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar
                        src="https://picsum.photos/200/300"
                        isOnline={false}
                        size="medium"
                    />

                    <div className="font-medium hidden md:flex">
                        <div>Nesle Tagalog</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar
                        src="https://picsum.photos/200/300"
                        isOnline={true}
                        size="medium"
                    />

                    <div className="font-medium hidden md:flex">
                        <div>Roger Pantil</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar
                        src="https://picsum.photos/200/300"
                        isOnline={false}
                        size="medium"
                    />

                    <div className="font-medium hidden md:flex">
                        <div>John Doe</div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Avatar
                        src="https://picsum.photos/200/300"
                        isOnline={true}
                        size="medium"
                    />

                    <div className="font-medium hidden md:flex">
                        <div>David Morgan</div>
                    </div>
                </div>
            </section>
        </aside>
    )
}
