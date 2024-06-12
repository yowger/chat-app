import { RouteObject } from "react-router-dom"

import Home from "@/features/Home"
import Register from "@/features/Register"
import Login from "@/features/Login"

const PublicRoutes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
]

export default PublicRoutes
