import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import useAuthContext from "@/features/auth/hooks/useAuthContext"
import { useRefreshAuth } from "@/features/auth/api/useRefreshAuth"

import type { FC, PropsWithChildren } from "react"

interface PersistAuthProps extends PropsWithChildren {}

const PersistAuth: FC<PersistAuthProps> = ({ children }) => {
    const { auth } = useAuthContext()
    const { mutate } = useRefreshAuth()
    const [cookies] = useCookies(["is_logged_in"])
    const [trueSuccess, setTrueSuccess] = useState(false)

    useEffect(() => {
        const checkAndRefreshAuth = () => {
            if (cookies.is_logged_in && !auth.isAuthenticated) {
                mutate()
            }

            setTrueSuccess(true)
        }

        checkAndRefreshAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!trueSuccess) {
        return <div>Loading...</div>
    }

    return children
}

export default PersistAuth
