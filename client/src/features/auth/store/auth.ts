import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import createSelectors from "@/lib/zustand/selectors"

interface AuthState {
    auth: { accessToken: string; isLoggedIn: boolean; isAuthenticated: boolean }
}

interface AuthActions {
    updateSession: (accessToken: AuthState["auth"]["accessToken"]) => void
    clearSession: () => void
}

type AuthStore = AuthState & AuthActions

const initialAuthState: AuthState = {
    auth: { accessToken: "", isLoggedIn: false, isAuthenticated: false },
}

export const useAuthStoreBase = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialAuthState,
                updateSession: (accessToken) =>
                    set(() => ({
                        auth: {
                            accessToken,
                            isLoggedIn: true,
                            isAuthenticated: true,
                        },
                    })),
                clearSession: () => set(initialAuthState),
            }),
            {
                name: "logged-in",
                partialize: (state) => ({
                    auth: {
                        isLoggedIn: state.auth.isLoggedIn,
                    },
                }),
            }
        )
    )
)

const useAuthStore = createSelectors(useAuthStoreBase)

export default useAuthStore
