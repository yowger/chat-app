import Avatar from "@/components/ui/Avatar"
import useUserStore from "../../auth/store/user"

function ChatHeader() {
    const user = useUserStore.use.user()

    return (
        <div className="px-4 bg-red-200 absolute h-16 w-full flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Avatar
                    src="https://picsum.photos/200/300"
                    isOnline={true}
                    size="medium"
                />

                <div className="font-medium">
                    <div>{user?.username}</div>
                </div>
            </div>

            <p>Header End</p>
        </div>
    )
}

export default ChatHeader
