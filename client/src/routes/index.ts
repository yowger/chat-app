import { useRoutes } from "react-router-dom"

import CommonRoutes from "./Common"
import PublicRoutes from "@/routes/Public"
import PrivateRoutes from "@/routes/Private"

import useAuthStore from "@/features/auth/store/auth"

export default function RootRoutes() {
    const auth = useAuthStore.use.auth()

    const routes = auth.isAuthenticated ? PrivateRoutes : PublicRoutes

    const element = useRoutes([...routes, ...CommonRoutes])

    return element
}
