import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react"

import { useChatBubbleContext } from "./hooks/useChatBubbleContext"

import type { FC } from "react"

interface MenuItem {
    label: string
    href?: string
    onClick?: () => void
}

interface ChatBubbleActionsProps {
    items: MenuItem[]
}

const ChatBubbleActions: FC<ChatBubbleActionsProps> = ({ items }) => {
    const { reverse } = useChatBubbleContext()

    return (
        <Menu>
            <MenuButton className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg focus:outline-none dark:bg-gray-900 dark:hover:bg-gray-800 data-[hover]:bg-gray-100 data-[open]:bg-gray-100 data-[focus]:outline-1 data-[focus]:outline-white">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 4 15"
                >
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </MenuButton>
            <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems
                    anchor={reverse ? "bottom end" : "bottom start"}
                    className="mt-1.5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {items.map((item, index) => (
                            <MenuItem key={index}>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export default ChatBubbleActions
