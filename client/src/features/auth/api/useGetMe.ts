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

export interface useHttpGetProfileResponse extends Profile {}

const useFetchMe = (): Promise<useHttpGetProfileResponse> => {
    const axiosPrivate = useAxiosPrivate()

    return axiosPrivate.get("/api/users/me")
}

interface useGetProfileOptions {
    config?: QueryConfig<Profile>
}

export const useGetMe = ({ config }: useGetProfileOptions = {}) => {
    return useQuery<Profile, Error, Profile>({
        queryKey: ["profile", "me"],
        queryFn: useFetchMe,
        ...config,
    })
}
