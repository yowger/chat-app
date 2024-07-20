import type { StateCreator } from "zustand"

export interface ActiveChatState {
    activeChatId: string | null
}

export interface ActiveChatActions {
    setActiveChatId: (chatId: string) => void
    clearActiveChatId: () => void
    resetActiveChat: () => void
}

export type ActiveChatSlice = ActiveChatState & ActiveChatActions

const initialState: ActiveChatState = {
    activeChatId: null,
}

const createActiveChatSlice: StateCreator<ActiveChatSlice> = (set) => ({
    ...initialState,
    setActiveChatId: (chatId: string) => set({ activeChatId: chatId }),
    clearActiveChatId: () => set({ activeChatId: null }),
    resetActiveChat: () => set(initialState),
})

export default createActiveChatSlice
