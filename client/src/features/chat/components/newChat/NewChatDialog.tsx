import { IconX } from "@tabler/icons-react"
import { Input } from "@/components/ui/Input"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react"

import ContactPreviewContainer from "../contactPreview/Container"
import ContactPreviewAvatar from "../contactPreview/Avatar"
import ContactPreviewInfo from "../contactPreview/Info"
import ContactPreviewUserName from "../contactPreview/Name"

import type { FC } from "react"

interface NewChatProps {
    isOpen: boolean
    onClose: () => void
}

const NewChatDialog: FC<NewChatProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <Dialog
            as="div"
            open={isOpen}
            onClose={onClose}
            transition
            className="relative z-10 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-lg rounded-md bg-white py-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className="flex items-center justify-between px-6 mb-6">
                            <DialogTitle
                                as="h3"
                                className="text-lg font-semibold text-gray-800"
                            >
                                New Conversation
                            </DialogTitle>

                            <IconX
                                size={18}
                                onClick={onClose}
                                className="cursor-pointer text-gray-800"
                            />
                        </div>

                        <div className="px-6">
                            <Input placeholder="search for people" />
                        </div>

                        <section className="mt-6">
                            <h3 className="px-6 mb-1 font-medium">Friends</h3>

                            <div className="px-[18px]">
                                <ContactPreviewContainer>
                                    <ContactPreviewAvatar
                                        src="https://picsum.photos/200/300"
                                        isOnline={false}
                                        size="small"
                                        className="mr-3"
                                    />
                                    <ContactPreviewInfo>
                                        <ContactPreviewUserName className="text-sm">
                                            James Macagba
                                        </ContactPreviewUserName>
                                    </ContactPreviewInfo>
                                </ContactPreviewContainer>

                                <ContactPreviewContainer>
                                    <ContactPreviewAvatar
                                        src="https://picsum.photos/200/300"
                                        isOnline={false}
                                        size="small"
                                        className="mr-3"
                                    />
                                    <ContactPreviewInfo>
                                        <ContactPreviewUserName className="text-sm">
                                            James Macagba
                                        </ContactPreviewUserName>
                                    </ContactPreviewInfo>
                                </ContactPreviewContainer>
                            </div>
                        </section>

                        <section className="mt-6">
                            <h3 className="px-6 mb-1 font-medium">Strangers</h3>

                            <div className="px-[18px]">
                                <ContactPreviewContainer>
                                    <ContactPreviewAvatar
                                        src="https://picsum.photos/200/300"
                                        isOnline={false}
                                        size="small"
                                    />
                                    <ContactPreviewInfo>
                                        <ContactPreviewUserName className="text-sm">
                                            James Macagba
                                        </ContactPreviewUserName>
                                    </ContactPreviewInfo>
                                </ContactPreviewContainer>
                            </div>
                        </section>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default NewChatDialog
