import { useContext } from "react"

import { SocketContext } from "./SocketContext"

const useSocketContext = () => {
    const socketContext = useContext(SocketContext)

    if (!socketContext) {
        throw new Error(
            "authContext has to be used within <CurrentUserContext.Provider>"
        )
    }

    return socketContext
}

export default useSocketContext
