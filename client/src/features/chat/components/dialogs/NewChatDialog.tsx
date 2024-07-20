import { IconX } from "@tabler/icons-react"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react"

import { useFindChat } from "../../api/useFindChat"

import useChatStore from "../../store"

import { useDebounceValue } from "@/hooks/useDebounceValue"

import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/Input"
import SearchUserList from "../SearchUserList"

import type { FC } from "react"
import type { Recipient } from "../../types/User"

interface NewChatProps {
    isOpen: boolean
    onClose: () => void
}

const getChatType = (recipients: Recipient[]) => {
    if (recipients.length === 0) {
        return "empty"
    } else if (recipients.length === 1) {
        return "single"
    } else {
        return "group"
    }
}

const NewChatDialog: FC<NewChatProps> = ({ isOpen, onClose }) => {
    const recipients = useChatStore.use.recipients()
    const addRecipient = useChatStore.use.addRecipient()
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const createNewChat = useChatStore.use.setIsCreatingChat()
    const removeRecipient = useChatStore.use.removeRecipient()
    const setActiveChatId = useChatStore.use.setActiveChatId()
    const getCreateChatStatus = getChatType(recipients)
    const [username, setUsername] = useDebounceValue("", 500)

    const { mutate, isPending } = useFindChat()

    const handleAddRecipient = (recipient: Recipient) => {
        const recipientExists = recipients.some((r) => r._id === recipient._id)

        recipientExists
            ? removeRecipient(recipient._id)
            : addRecipient(recipient)
    }

    const handleRemoveRecipient = (recipientId: string) => {
        removeRecipient(recipientId)
    }

    const handleOnClose = () => {
        const isEmptyChat = recipients.length === 0 && isCreatingChat

        if (isEmptyChat) {
            createNewChat(false)
        }

        onClose()
    }

    const HandleCreateChat = () => {
        const recipientIds = recipients.map((recipient) => recipient._id)

        mutate(
            { input: { participants: recipientIds } },
            {
                onSuccess: (response) => {
                    setActiveChatId(response._id)
                    createNewChat(false)
                    onClose()
                },
                onError: (error) => {
                    const chatNotFound = error.response?.status === 404

                    if (chatNotFound) {
                        createNewChat(true)
                        onClose()
                    }
                },
            }
        )
    }

    if (!isOpen) return null

    return (
        <Dialog
            as="div"
            open={isOpen}
            onClose={handleOnClose}
            transition
            className="relative z-10 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <DialogBackdrop
                transition
                className="overflow-y-auto fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 z-10 w-screen">
                <div className="relative flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="relative flex flex-col h-screen max-h-[32rem] space-y-4 w-full max-w-lg rounded-md bg-white py-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className="flex items-center justify-between px-6">
                            <DialogTitle
                                as="h3"
                                className="text-lg font-semibold text-gray-800"
                            >
                                New Conversation
                            </DialogTitle>

                            <IconX
                                size={18}
                                onClick={handleOnClose}
                                className="cursor-pointer text-gray-800"
                            />
                        </div>

                        <div className="px-6">
                            <Input
                                onChange={(event) =>
                                    setUsername(event.currentTarget.value)
                                }
                                placeholder="search for people"
                            />
                        </div>

                        <section className="flex-1 relative overflow-y-auto">
                            <h3 className="px-6 font-medium mb-1.5">Friends</h3>

                            <div className="px-[18px]">
                                <SearchUserList
                                    onUserClick={handleAddRecipient}
                                    activeRecipients={recipients}
                                    username={username}
                                />
                            </div>
                        </section>

                        {getCreateChatStatus !== "empty" && (
                            <section className="px-6">
                                <span className="block font-medium mb-1.5">
                                    To:
                                </span>

                                <div className="flex flex-wrap gap-2 mb-2">
                                    {[...recipients].map((recipient) => (
                                        <span
                                            key={`recipients-item-${recipient._id}`}
                                            id="badge-dismiss-default"
                                            className="text-nowrap inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded cursor-pointer"
                                        >
                                            {recipient.username}
                                            <button
                                                onClick={() =>
                                                    handleRemoveRecipient(
                                                        recipient._id
                                                    )
                                                }
                                                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
                                            >
                                                <IconX size={15} />
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={HandleCreateChat}
                                        variant="default"
                                        size="small"
                                        disabled={isPending}
                                    >
                                        {getCreateChatStatus === "single"
                                            ? "Start chat"
                                            : "Start group chat"}
                                    </Button>
                                </div>
                            </section>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default NewChatDialog
