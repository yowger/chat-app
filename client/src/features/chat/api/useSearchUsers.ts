import { useInfiniteQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/lib/axios/useAxiosPrivate"

import type { AxiosInstance } from "axios"
import type { Profile } from "../types/User"
import type { InfiniteQueryConfig } from "@/lib/query"

type SearchedUsers = Pick<Profile, "_id" | "username">

export interface SearchUsersResponse {
    currentPage: number
    totalPages: number
    totalUsers: number
    users: SearchedUsers[]
}

interface FetchUserParams {
    username: string
    page?: number
    limit?: number
}

const fetchUsers = async (
    axios: AxiosInstance,
    { username, page = 1, limit = 10 }: FetchUserParams
): Promise<SearchUsersResponse> => {
    const response = await axios.get("/api/users/search", {
        params: {
            query: username,
            page,
            limit,
        },
    })

    return response.data
}

interface UseSearchUsersOptions {
    searchParams: {
        username: string
    }
    config?: InfiniteQueryConfig<SearchUsersResponse>
}

export const useSearchUsers = ({
    searchParams,
    config,
}: UseSearchUsersOptions) => {
    const { username } = searchParams
    const axiosPrivate = useAxiosPrivate()

    return useInfiniteQuery<SearchUsersResponse, Error>({
        queryKey: ["users", "search", username],
        queryFn: ({ pageParam = 1 }) =>
            fetchUsers(axiosPrivate, { username, page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: SearchUsersResponse) => {
            const nextPage = lastPage.currentPage + 1
            return nextPage <= lastPage.totalPages ? nextPage : undefined
        },
        enabled: !!username,
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
