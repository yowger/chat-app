import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import vercel from "vite-plugin-vercel"

export default defineConfig({
    plugins: [react(), vercel()],
    server: {
        port: process.env.PORT as unknown as number,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
