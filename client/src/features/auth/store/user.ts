import { create } from "zustand"

import createSelectors from "@/lib/zustand/selectors"

import type { User } from "../../chat/types/User"

interface UserState {
    user: User | null
}

interface userActions {
    setUser: (user: User) => void
    reset: () => void
}

type UserStore = UserState & userActions

const initialState: UserState = {
    user: null,
}

const useUserStoreBase = create<UserStore>((set) => ({
    ...initialState,
    setUser: (user) => set({ user }),
    reset: () => set(initialState),
}))

const useUserStore = createSelectors(useUserStoreBase)

export default useUserStore
