import { resolve } from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// https://vitejs.dev/config/

// @ts-ignore
const root = resolve(__dirname, "./src")

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": root,
        },
    },
})
