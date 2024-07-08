import { create } from "zustand"

import createSelectors from "@/lib/zustand/selectors"

interface ChatState {
    activeChatSessionId: string | null
}

interface ChatActions {
    setActiveChatSessionId: (sessionId: string) => void
    clearActiveChatSessionId: () => void
    reset: () => void
}

type ChatStore = ChatState & ChatActions

const initialState = {
    activeChatSessionId: null,
}

const useChatStoreBase = create<ChatStore>((set) => ({
    ...initialState,
    setActiveChatSessionId: (sessionId) =>
        set(() => ({ activeChatSessionId: sessionId })),
    clearActiveChatSessionId: () => set({ activeChatSessionId: null }),
    reset: () => set(initialState),
}))

const useChatStore = createSelectors(useChatStoreBase)

export default useChatStore
