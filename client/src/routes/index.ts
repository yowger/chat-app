import { useRoutes } from "react-router-dom"

import PublicRoutes from "@/routes/Public"
import PrivateRoutes from "@/routes/Private"

export default function RootRoutes() {
    const router = useRoutes([...PublicRoutes, ...PrivateRoutes])

    return router
}
