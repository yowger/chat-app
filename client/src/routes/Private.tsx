import Chat from "@/features/chat/pages/Chat"

import { RouteObject } from "react-router-dom"

const PrivateRoutes: RouteObject[] = [{ path: "/", element: <Chat /> }]

export default PrivateRoutes
