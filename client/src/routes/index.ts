import { useRoutes } from "react-router-dom"

import PublicRoutes from "@/routes/Public"

export default function RootRoutes() {
    const router = useRoutes([...PublicRoutes])

    return router
}
