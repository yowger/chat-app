import { useContext } from "react"

import { AuthContext } from "@/features/auth/context/Auth"

const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error(
            "authContext has to be used within <CurrentUserContext.Provider>"
        )
    }

    return authContext
}

export default useAuthContext
