import { useEffect } from "react"

import { useRefreshAuth } from "@/features/auth/api/useRefreshAuth"

import type { FC, PropsWithChildren } from "react"

interface RefreshAuthWrapperProps extends PropsWithChildren {}

const RefreshAuthWrapper: FC<RefreshAuthWrapperProps> = ({ children }) => {
    const { mutate, isIdle, isPending } = useRefreshAuth()

    useEffect(() => {
        mutate()
    }, [mutate])

    if (isIdle || isPending) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default RefreshAuthWrapper
