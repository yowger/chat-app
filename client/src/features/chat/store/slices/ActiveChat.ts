import type { Recipient } from "../../types/User"
import type { StateCreator } from "zustand"

export interface ActiveChatState {
    activeChatId: string | null
    recipients: Recipient[]
}

export interface ActiveChatActions {
    setActiveChatId: (chatId: string) => void
    clearActiveChatId: () => void
    resetActiveChat: () => void
    setRecipients: (recipients: Recipient[]) => void
    clearRecipients: () => void
}

export type ActiveChatSlice = ActiveChatState & ActiveChatActions

const initialState: ActiveChatState = {
    activeChatId: null,
    recipients: [],
}

const createActiveChatSlice: StateCreator<ActiveChatSlice> = (set) => ({
    ...initialState,
    setActiveChatId: (chatId: string) => set({ activeChatId: chatId }),
    clearActiveChatId: () => set({ activeChatId: null }),
    resetActiveChat: () => set(initialState),
    setRecipients: (recipients: Recipient[]) => set({ recipients }),
    clearRecipients: () => set({ recipients: [] }),
})

export default createActiveChatSlice
