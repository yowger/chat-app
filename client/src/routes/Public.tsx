import { lazy } from "react"
import { RouteObject } from "react-router-dom"

const Login = lazy(() => import("@/features/auth/pages/Login"))
const Register = lazy(() => import("@/features/auth/pages/Register"))

const PublicRoutes: RouteObject[] = [
    { path: "/register", element: <Register /> },
    { path: "/", element: <Login /> },
]

export default PublicRoutes
