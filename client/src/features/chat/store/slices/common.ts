import { StateCreator } from "zustand"

interface CommonState {
    isCreateChatModalOpen: boolean
}

export interface CommonActions {
    setIsCreateChatModalOpen: (isOpen: boolean) => void
    toggleCreateChatModal: () => void
}

export type CommonSlice = CommonState & CommonActions

const initialState: CommonState = {
    isCreateChatModalOpen: false,
}

const createCommonSlice: StateCreator<CommonSlice> = (set) => ({
    ...initialState,
    setIsCreateChatModalOpen: (isOpen) =>
        set({ isCreateChatModalOpen: isOpen }),
    toggleCreateChatModal: () =>
        set((state) => ({
            isCreateChatModalOpen: !state.isCreateChatModalOpen,
        })),
})

export default createCommonSlice
