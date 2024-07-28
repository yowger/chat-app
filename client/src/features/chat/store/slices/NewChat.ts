import type { Recipient } from "../../types/User"
import type { StateCreator } from "zustand"

export interface NewChatState {
    createChatRecipients: Recipient[]
    isCreatingChat: boolean
    isCreatingChatSelected: boolean
}

export interface NewChatActions {
    addRecipient: (recipient: Recipient) => void
    removeRecipient: (recipientId: string) => void
    clearRecipients: () => void
    setIsCreatingChat: (isCreating: boolean) => void
    setIsCreatingChatSelected: (isSelected: boolean) => void
    resetNewChat: () => void
}

export type NewChatSlice = NewChatState & NewChatActions

const initialState: NewChatState = {
    createChatRecipients: [],
    isCreatingChat: false,
    isCreatingChatSelected: false,
}

const createNewChatSlice: StateCreator<NewChatSlice> = (set) => ({
    ...initialState,
    addRecipient: (recipient: Recipient) =>
        set((state) => {
            const recipientExists = state.createChatRecipients.some(
                (r) => r._id === recipient._id
            )

            if (recipientExists) {
                return state
            }

            return {
                createChatRecipients: [
                    ...state.createChatRecipients,
                    recipient,
                ],
            }
        }),
    removeRecipient: (recipientId: string) =>
        set((state) => ({
            createChatRecipients: state.createChatRecipients.filter(
                (recipient) => recipient._id !== recipientId
            ),
        })),
    clearRecipients: () => set({ createChatRecipients: [] }),
    setIsCreatingChat: (isCreating: boolean) =>
        set({ isCreatingChat: isCreating }),
    setIsCreatingChatSelected: (isSelected: boolean) =>
        set({ isCreatingChatSelected: isSelected }),
    resetNewChat: () => set(initialState),
})

export default createNewChatSlice
