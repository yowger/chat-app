import { useEffect } from "react"

import { useRefreshAuth } from "../api/useRefreshAuth"

import useAuthStore from "../store/auth"

import { useHydration } from "../hooks/useHydration"

import type { FC, PropsWithChildren } from "react"

interface PersistAuthProps extends PropsWithChildren {}

const PersistAuth: FC<PersistAuthProps> = ({ children }) => {
    const { isLoggedIn } = useAuthStore.use.auth()

    const hasHydrated = useHydration()
    const { mutate: refreshAuth } = useRefreshAuth()

    useEffect(() => {
        const refreshIfHasLoggedIn = () => {
            if (isLoggedIn) {
                refreshAuth()
            }
        }

        refreshIfHasLoggedIn()
    }, [isLoggedIn, refreshAuth])

    if (!hasHydrated) {
        return <div>Loading...</div>
    }

    return children
}

export default PersistAuth
