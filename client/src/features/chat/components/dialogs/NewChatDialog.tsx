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

import { getChatType } from "../../utils"

import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/Input"
import SearchUserList from "../lists/SearchUserList"
import RecipientSelector from "../RecipientSelector"

import type { FC } from "react"
import type { Recipient } from "../../types/User"

interface NewChatProps {
    isOpen: boolean
    onClose: () => void
}

const NewChatDialog: FC<NewChatProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useDebounceValue("", 500)
    const recipients = useChatStore.use.createChatRecipients()
    const isCreatingChat = useChatStore.use.isCreatingChat()
    const addRecipient = useChatStore.use.addRecipient()
    const createNewChat = useChatStore.use.setIsCreatingChat()
    const removeRecipient = useChatStore.use.removeRecipient()
    const setActiveChat = useChatStore.use.setToActiveChat()
    const setToCreatingChat = useChatStore.use.setToCreatingChat()

    const chatType = getChatType(recipients)

    const { mutate, isPending } = useFindChat()

    const handleAddRecipient = (recipient: Recipient) => {
        const recipientExists = recipients.some((r) => r._id === recipient._id)

        recipientExists
            ? removeRecipient(recipient._id)
            : addRecipient(recipient)
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
                    setActiveChat(response._id)
                    createNewChat(false)
                    onClose()
                },
                onError: (error) => {
                    const chatNotFound = error.response?.status === 404

                    if (chatNotFound) {
                        createNewChat(true)
                        setToCreatingChat()
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

                        {chatType !== "empty" && (
                            <>
                                <div className="px-6">
                                    <span className="block font-medium mb-1.5">
                                        To:
                                    </span>

                                    <RecipientSelector
                                        recipients={recipients}
                                        onRemoveRecipient={removeRecipient}
                                    />
                                </div>

                                <div className="px-6 flex justify-end">
                                    <Button
                                        onClick={HandleCreateChat}
                                        variant="default"
                                        size="small"
                                        disabled={isPending}
                                    >
                                        {chatType === "single"
                                            ? "Start chat"
                                            : "Start group chat"}
                                    </Button>
                                </div>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default NewChatDialog
