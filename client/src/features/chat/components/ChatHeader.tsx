import useUserStore from "../../auth/store/user"
import useChatStore from "../store"

import { formatParticipantsList } from "../utils"

import Avatar from "@/components/ui/Avatar"

function ChatHeader() {
    const activeChatRecipients = useChatStore.use.recipients()
    const user = useUserStore.use.user()

    const participantsWithoutUser = activeChatRecipients.filter(
        (participant) => participant._id !== user?._id
    )

    const chatName =
        formatParticipantsList(participantsWithoutUser) || "Unknown"

    const shouldShowSingleAvatar =
        activeChatRecipients.length === 2 &&
        participantsWithoutUser.length === 1

    return (
        <div className="px-4 h-[60px] w-full flex justify-between items-center border-b">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-4 rtl:space-x-reverse relative">
                    {shouldShowSingleAvatar ? (
                        <Avatar
                            key={participantsWithoutUser[0]._id}
                            src={`https://picsum.photos/200/300?random=${participantsWithoutUser[0]._id}`}
                            alt={participantsWithoutUser[0].username}
                            size="medium"
                        />
                    ) : (
                        activeChatRecipients
                            .slice(0, 3)
                            .map((recipient, index) => (
                                <Avatar
                                    key={recipient._id}
                                    src={`https://picsum.photos/200/300?random=${index}`}
                                    alt={recipient.username}
                                    size="medium"
                                />
                            ))
                    )}

                    {activeChatRecipients.length > 3 && (
                        <div className="z-10 flex items-center justify-center size-[1.563rem] text-xs font-medium text-white bg-slate-500 border border-white rounded-full absolute -right-2 bottom-0">
                            +{activeChatRecipients.length - 3}
                        </div>
                    )}
                </div>

                <div className="font-medium">
                    <div>{chatName}</div>
                </div>
            </div>

            {/* <p>Header End</p> */}
        </div>
    )
}

export default ChatHeader
