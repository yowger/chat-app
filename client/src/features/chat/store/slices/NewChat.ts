import type { Recipient } from "../../types/User"
import type { StateCreator } from "zustand"

export interface NewChatState {
    recipients: Recipient[]
    isCreatingChat: boolean
}

export interface NewChatActions {
    addRecipient: (recipient: Recipient) => void
    removeRecipient: (recipientId: string) => void
    clearRecipients: () => void
    setIsCreatingChat: (isCreating: boolean) => void
    resetNewChat: () => void
}

export type NewChatSlice = NewChatState & NewChatActions

const initialState: NewChatState = {
    recipients: [],
    isCreatingChat: false,
}

const createNewChatSlice: StateCreator<NewChatSlice> = (set) => ({
    ...initialState,
    addRecipient: (recipient: Recipient) =>
        set((state) => {
            const recipientExists = state.recipients.some(
                (r) => r._id === recipient._id
            )
            if (recipientExists) {
                return state
            }
            return {
                recipients: [...state.recipients, recipient],
            }
        }),
    removeRecipient: (recipientId: string) =>
        set((state) => ({
            recipients: state.recipients.filter(
                (recipient) => recipient._id !== recipientId
            ),
        })),
    clearRecipients: () => set({ recipients: [] }),
    setIsCreatingChat: (isCreating: boolean) =>
        set({ isCreatingChat: isCreating }),
    resetNewChat: () => set(initialState),
})

export default createNewChatSlice
