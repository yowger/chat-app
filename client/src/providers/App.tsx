import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import { AuthContextProvider } from "@/features/auth/context/Auth"

import { Button } from "@/components/ui/button/Button"
import RefreshAuthWrapper from "@/features/auth/components/RefreshAuthWrapper"

import type { FC, PropsWithChildren } from "react"

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Something went wrong.</h2>
            <Button
                className="mt-4"
                onClick={() => window.location.assign(window.location.origin)}
            >
                Refresh
            </Button>
        </div>
    )
}

interface AppProviderProps extends PropsWithChildren {}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AuthContextProvider>
                            <RefreshAuthWrapper>{children}</RefreshAuthWrapper>
                        </AuthContextProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </ErrorBoundary>
        </Suspense>
    )
}

export default AppProvider
