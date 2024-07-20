import { Outlet } from "react-router-dom"

import { useGetMe } from "@/features/chat/api/useGetMe"

import useAuthStore from "@/features/auth/store/auth"
import useUserStore from "@/features/auth/store/user"

const RequireUser = () => {
    const clearSession = useAuthStore.use.clearSession()
    const setUser = useUserStore.use.setUser()

    const { data, isLoading, isError } = useGetMe()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (isError) {
        clearSession()
    }

    if (data) {
        setUser(data)
        return <Outlet />
    }
}

export default RequireUser
