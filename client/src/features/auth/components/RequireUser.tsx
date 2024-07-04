import { Outlet } from "react-router-dom"

import { useGetMe } from "../api/useGetMe"

import useEndSession from "../hooks/useEndSession"

const RequireUser = () => {
    const { data, isLoading, isError } = useGetMe()
    const endSession = useEndSession()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (isError) {
        endSession()
    }

    if (data) {
        return <Outlet />
    }
}

export default RequireUser
