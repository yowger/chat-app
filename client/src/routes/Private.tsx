import Chat from "@/features/chat/Chat"

import { RouteObject } from "react-router-dom"

const PrivateRoutes: RouteObject[] = [{ path: "/chat", element: <Chat /> }]

export default PrivateRoutes
