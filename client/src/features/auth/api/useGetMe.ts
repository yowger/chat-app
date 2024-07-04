import { useQuery } from "@tanstack/react-query"

import useAxiosPrivate from "@/hooks/useAxiosPrivate"

import type { QueryConfig } from "@/lib/query"

export type Profile = {
    _id: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface getMeResponse extends Profile {}

interface useGetProfileOptions {
    config?: QueryConfig<Profile>
}

export const useGetMe = ({ config }: useGetProfileOptions = {}) => {
    const axiosPrivate = useAxiosPrivate()

    const fetchMe = (): Promise<getMeResponse> => {
        return axiosPrivate.get("/api/users/me")
    }

    return useQuery<Profile, Error>({
        queryKey: ["profile", "me"],
        queryFn: fetchMe,
        ...config,
    })
}
