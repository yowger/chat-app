import { RouteObject } from "react-router-dom"

// import Home from "@/features/Home"
import Register from "@/features/auth/pages/Register"
import Login from "@/features/auth/pages/Login"

const PublicRoutes: RouteObject[] = [
    // { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Login /> },
]

export default PublicRoutes
