import { useCookies } from "react-cookie"

import useAuthContext from "./useAuthContext"

const useEndSession = () => {
    const { setAuth } = useAuthContext()
    const [_cookies, _setCookies, removeCookie] = useCookies(["is_logged_in"])

    const logout = () => {
        removeCookie("is_logged_in")

        setAuth({
            accessToken: "",
            isAuthenticated: false,
        })
    }

    return logout
}

export default useEndSession
