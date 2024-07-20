import { create } from "zustand"

import createSelectors from "@/lib/zustand/selectors"

import createActiveChatSlice from "./slices/ActiveChat"
import createNewChatSlice from "./slices/NewChat"
import createSharedChatSlice from "./slices"

import type { ActiveChatSlice } from "./slices/ActiveChat"
import type { NewChatSlice } from "./slices/NewChat"
import type { SharedChatSlice } from "./slices"

type ChatStore = ActiveChatSlice & NewChatSlice & SharedChatSlice

const useChatStoreBase = create<ChatStore>()((...a) => ({
    ...createActiveChatSlice(...a),
    ...createNewChatSlice(...a),
    ...createSharedChatSlice(...a),
}))

const useChatStore = createSelectors(useChatStoreBase)

export default useChatStore
