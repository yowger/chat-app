export const API_URL =
    import.meta.env.VITE_VERCEL_ENV === "production"
        ? import.meta.env.VITE_VERCEL_SERVER_URL
        : import.meta.env.VITE_SERVER_URL
