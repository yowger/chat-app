import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { InfiniteQueryConfig } from "@/lib/query"
import type { Pagination, PaginationInput } from "../types/Pagination"
import type { ChatUser } from "../types/User"

export interface GetUsersResponse {
    users: ChatUser[]
    pagination: Pagination
}

interface FetchUserOptions {
    query: {
        username: string
    }
    pagination: Partial<PaginationInput>
}

const getUsers = async (
    axios: AxiosInstance,
    options: FetchUserOptions
): Promise<GetUsersResponse> => {
    const { query, pagination } = options
    const { username } = query
    const { page = 0, limit = 10 } = pagination

    const response = await axios.get("/api/user", {
        params: {
            username,
            page,
            limit,
        },
    })

    return response.data
}

interface UseGetUsersOptions {
    query: {
        username: string
    }
    config?: InfiniteQueryConfig<GetUsersResponse>
}

export const useGetUsers = (options: UseGetUsersOptions) => {
    const { query, config } = options
    const { username } = query

    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<GetUsersResponse, Error>({
        queryKey: ["users", username],
        queryFn: ({ pageParam = 1 }) => {
            const fetchUsersOptions: FetchUserOptions = {
                query: {
                    username,
                },
                pagination: {
                    page: pageParam as number,
                },
            }

            return getUsers(axiosPrivate, fetchUsersOptions)
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetUsersResponse) => {
            const currentPage = lastPage.pagination.page
            const totalPages = lastPage.pagination.totalPages
            const nextPage = currentPage + 1

            const hasNextPage = nextPage <= totalPages

            return hasNextPage ? nextPage : undefined
        },
        ...config,
    })
}

/*
import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/hooks/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { Profile } from "../types/User"
import type { QueryConfig } from "@/lib/query"

type SearchedUsers = Pick<Profile, "_id" | "username">

export interface SearchUsersResponse {
    currentPage: number
    totalPages: number
    totalUsers: number
    users: SearchedUsers[]
}

const fetchUsers = async (
    axios: AxiosInstance,
    username: string
): Promise<SearchUsersResponse> => {
    const response = await axios.get("/api/users/search", {
        params: {
            query: username,
        },
    })

    return response.data
}

interface UseSearchUsersOptions {
    searchParams: {
        username: string
    }
    config?: QueryConfig<SearchUsersResponse>
}

export const useSearchUsers = ({
    searchParams,
    config,
}: UseSearchUsersOptions) => {
    const { username } = searchParams
    const axiosPrivate = useAxiosPrivate()

    return useQuery<SearchUsersResponse, Error>({
        queryKey: ["users", "search", username],
        queryFn: () => fetchUsers(axiosPrivate, username),
        enabled: !!username,
        ...config,
    })
}
*/
