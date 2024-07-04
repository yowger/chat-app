import React, { createContext, useState } from "react"

import type { ReactNode } from "react"

type AuthContextType = {
    auth: { accessToken: string; isAuthenticated: boolean }
    setAuth: React.Dispatch<
        React.SetStateAction<{ accessToken: string; isAuthenticated: boolean }>
    >
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState({
        accessToken: "",
        isAuthenticated: false,
    })

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
