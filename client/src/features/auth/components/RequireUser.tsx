import { Outlet } from "react-router-dom"
import { useGetMe } from "../api/useGetMe"

import useEndSession from "../hooks/useEndSession"

const RequireUser = () => {
    const endSession = useEndSession()
    const { data, isLoading, isError } = useGetMe()

    if (isLoading) {
        return <div>is loading...</div>
    }

    if (isError) {
        endSession()
    }

    if (data) {
        return <Outlet />
    }
}

export default RequireUser
