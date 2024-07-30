import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

import { useState } from "react"

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

import { useLogout } from "@/features/auth/api/useLogout"

import useUserStore from "@/features/auth/store/user"

import Avatar from "@/components/ui/Avatar"
// import { Button } from "@/components/ui/button/Button"

const SidebarMenu = () => {
    const user = useUserStore.use.user()

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
        <div className="w-full px-3 flex justify-between">
            <div className="flex items-center gap-3">
                <Avatar src="https://picsum.photos/200/300" size="medium" />

                <div className="font-medium">
                    <div>{user?.username}</div>
                </div>
            </div>

            <Menu>
                <MenuButton className="inline-flex size-10 items-center gap-2 rounded-full py-2 px-2 text-gray-400 focus:outline-none data-[hover]:bg-blue-400 data-[hover]:text-white data-[open]:text-white duration-150 data-[open]:bg-blue-500 data-[focus]:outline-1 data-[focus]:outline-white">
                    <EllipsisHorizontalIcon className="size-6 w-full" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom start"
                    className="w-52 mt-2 origin-top-right shadow-sm rounded-md bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <button className="text-gray-900 group flex w-full items-center gap-3.5 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-100">
                            New convo
                        </button>
                    </MenuItem>
                    <hr className="h-px my-1 bg-gray-100 border-0" />
                    <MenuItem>
                        <button
                            onClick={handleLogout}
                            disabled={isPending}
                            className="text-gray-900 group flex w-full items-center gap-3.5 rounded-sm py-1.5 px-3 data-[focus]:bg-blue-500"
                        >
                            Logout
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}

export default SidebarMenu
