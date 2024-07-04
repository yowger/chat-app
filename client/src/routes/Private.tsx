import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import RequireUser from "@/features/auth/components/RequireUser"

const Chat = lazy(() => import("@/features/chat/pages/Chat"))

const PrivateRoutes: RouteObject[] = [
    {
        path: "/",
        element: <RequireUser />,
        children: [{ path: "", element: <Chat /> }],
    },
    // { path: "/", element: <Chat /> },
]

export default PrivateRoutes
