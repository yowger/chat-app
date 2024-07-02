import { useRoutes } from "react-router-dom"

import PublicRoutes from "@/routes/Public"
import PrivateRoutes from "@/routes/Private"

import useAuthContext from "@/features/auth/hooks/useAuthContext"
import CommonRoutes from "./Common"

export default function RootRoutes() {
    const { auth } = useAuthContext()

    const routes = auth.isAuthenticated ? PrivateRoutes : PublicRoutes

    const element = useRoutes([...routes, ...CommonRoutes])

    return element
}
