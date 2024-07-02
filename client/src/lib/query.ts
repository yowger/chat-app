import { QueryClient } from "@tanstack/react-query"

import type { AxiosError } from "axios"
import type {
    DefaultOptions,
    UseMutationOptions,
    UseQueryOptions,
} from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: false,
    },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">

export type MutateConfig<Response, TVariables = unknown> = UseMutationOptions<
    Response,
    AxiosError,
    TVariables,
    unknown
>
