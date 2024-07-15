import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import PersistAuth from "@/features/auth/components/PersistAuth"

import { Button } from "@/components/ui/button/Button"

import { refreshPage } from "@/utils/refreshPage"

import type { FC, PropsWithChildren } from "react"

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Something went wrong.</h2>
            <Button className="mt-4" onClick={refreshPage}>
                Refresh
            </Button>
        </div>
    )
}

// todo
const FullPageLoading = () => {
    return <div>Loading...</div>
}

interface AppProviderProps extends PropsWithChildren {}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    return (
        <Suspense fallback={<FullPageLoading />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <PersistAuth>{children}</PersistAuth>
                    </BrowserRouter>
                </QueryClientProvider>
            </ErrorBoundary>
        </Suspense>
    )
}

export default AppProvider
