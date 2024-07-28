import useChatStore from "../store"

import { mergeStyles } from "@/utils/mergeStyles"

import { generatePreviewName } from "../utils"

import Avatar from "@/components/ui/Avatar"

const NewChatPreview = () => {
    const participants = useChatStore.use.createChatRecipients()
    const isCreatingChatSelected = useChatStore.use.isCreatingChatSelected()
    const previewMessage = generatePreviewName(participants)
    const setToCreatingChat = useChatStore.use.setToCreatingChat()

    return (
        <div
            onClick={setToCreatingChat}
            className={mergeStyles(
                "flex items-center overflow-hidden p-1.5 rounded-md cursor-pointer min-w-0",
                isCreatingChatSelected ? "bg-blue-100" : "hover:bg-gray-600/10"
            )}
        >
            <div className="relative flex-shrink-0 mr-2.5">
                <Avatar
                    src="https://picsum.photos/200/300"
                    alt="Profile picture"
                    size="medium"
                />
                {participants.length > 1 && (
                    <div className="absolute bottom-0 -right-1.5">
                        <a
                            className="z-10 flex items-center justify-center size-7 text-xs font-medium text-white bg-zinc-600 border border-white rounded-full hover:bg-gray-600"
                            href="#"
                        >
                            +{participants.length - 1}
                        </a>
                    </div>
                )}
            </div>

            <div className="min-w-0">
                <p className="text-sm font-medium truncate">{previewMessage}</p>
            </div>
        </div>
    )
}

export default NewChatPreview
