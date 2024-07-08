import { useEffect } from "react"

import { useRefreshAuth } from "../api/useRefreshAuth"

import useAuthStore, { useHydration } from "../store/auth"

import type { FC, PropsWithChildren } from "react"

interface PersistAuthProps extends PropsWithChildren {}

const PersistAuth: FC<PersistAuthProps> = ({ children }) => {
    const { isLoggedIn } = useAuthStore.use.auth()
    const hasHydrated = useHydration()

    const { mutate } = useRefreshAuth()

    useEffect(() => {
        if (isLoggedIn) {
            mutate()
        }
    }, [isLoggedIn, mutate])

    if (!hasHydrated) {
        return <div>Loading...</div>
    } else {
        return children
    }
}

export default PersistAuth
