import { ActiveChatSlice } from "./ActiveChat"
import { NewChatSlice } from "./NewChat"

import type { StateCreator } from "zustand"

export interface SharedChatSliceActions {
    reset: () => void
    setToCreatingChat: () => void
    setToActiveChat: (activeChatId: string) => void
}

export type SharedChatSlice = SharedChatSliceActions

const createSharedChatSlice: StateCreator<
    ActiveChatSlice & NewChatSlice,
    [],
    [],
    SharedChatSlice
> = (_set, get) => ({
    reset: () => {
        get().resetNewChat()
        get().resetActiveChat()
    },
    setToCreatingChat: () => {
        get().clearActiveChatId()
        get().setIsCreatingChatSelected(true)
    },
    setToActiveChat: (activeChatId: string) => {
        get().setIsCreatingChatSelected(false)
        get().setActiveChatId(activeChatId)
    },
})

export default createSharedChatSlice
