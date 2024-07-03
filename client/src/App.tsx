import RootRoutes from "@/routes"
import AppProvider from "@/providers/App"

export default function App() {
    return (
        <AppProvider>
            <RootRoutes />
        </AppProvider>
    )
}
