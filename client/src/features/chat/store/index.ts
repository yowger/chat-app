import { create } from "zustand"

import createSelectors from "@/lib/zustand/selectors"

import createActiveChatSlice from "./slices/ActiveChat"
import createCommonSlice from "./slices/common"
import createNewChatSlice from "./slices/NewChat"
import createSharedChatSlice from "./slices"

import type { ActiveChatSlice } from "./slices/ActiveChat"
import type { NewChatSlice } from "./slices/NewChat"
import type { SharedChatSlice } from "./slices"
import type { CommonSlice } from "./slices/common"

type ChatStore = ActiveChatSlice & NewChatSlice & SharedChatSlice & CommonSlice

const useChatStoreBase = create<ChatStore>()((...a) => ({
    ...createActiveChatSlice(...a),
    ...createNewChatSlice(...a),
    ...createSharedChatSlice(...a),
    ...createCommonSlice(...a),
}))

const useChatStore = createSelectors(useChatStoreBase)

export default useChatStore
