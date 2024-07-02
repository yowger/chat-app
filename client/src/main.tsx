import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/query"

import { AuthContextProvider } from "@/features/auth/context/Auth"

import App from "@/App"

import "@/index.css"
import RefreshAuthWrapper from "./features/auth/components/RefreshAuthWrapper"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RefreshAuthWrapper>
                        <App />
                    </RefreshAuthWrapper>
                </QueryClientProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
