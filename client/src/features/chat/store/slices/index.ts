import type { StateCreator } from "zustand"
import { ActiveChatSlice } from "./ActiveChat"
import { NewChatSlice } from "./NewChat"

export interface SharedChatSliceActions {
    reset: () => void
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
})

export default createSharedChatSlice
