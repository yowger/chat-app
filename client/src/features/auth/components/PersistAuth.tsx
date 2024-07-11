import { useEffect } from "react"

import { useRefreshAuth } from "../api/useRefreshAuth"

import useAuthStore from "../store/auth"

import { useHydration } from "../hooks/useHydration"

import type { FC, PropsWithChildren } from "react"

interface PersistAuthProps extends PropsWithChildren {}

const PersistAuth: FC<PersistAuthProps> = ({ children }) => {
    const { isLoggedIn } = useAuthStore.use.auth()
    const hasHydrated = useHydration()

    const { mutate } = useRefreshAuth()

    useEffect(() => {
        const refreshIfHasLoggedIn = () => {
            if (isLoggedIn) {
                mutate()
            }
        }

        refreshIfHasLoggedIn()
    }, [isLoggedIn, mutate])

    if (!hasHydrated) {
        return <div>Loading...</div>
    }

    return children
}

export default PersistAuth
