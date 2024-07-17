import { useGetUsers } from "../api/useGetUsers"

import Avatar from "@/components/ui/Avatar"

import { Fragment } from "react"

interface SearchUserListProps {
    username: string
}

const SearchUserList = (props: SearchUserListProps) => {
    const { username } = props

    const {
        data,
        isError,
        isLoading,
        // fetchNextPage,
        // hasNextPage,
        // isFetchingNextPage,
    } = useGetUsers({
        query: { username },
    })

    if (isLoading) {
        return <p>loading...</p>
    }

    if (isError) {
        return <p>error loading users</p>
    }

    return (
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                    {page.users.map((user) => (
                        <li className="flex items-center overflow-hidden hover:bg-gray-600/10 p-1.5 rounded-md cursor-pointer min-w-0">
                            <Avatar
                                src="https://picsum.photos/200/300?1"
                                size="small"
                                className="mr-3"
                            />
                            <div className="min-w-0">
                                <p className="font-medium truncate text-sm">
                                    {user.username}
                                </p>
                            </div>
                        </li>
                    ))}
                </Fragment>
            ))}
        </ul>
    )
}

export default SearchUserList

/*
<div>
    {hasNextPage && (
        <Button onClick={handleViewMore}>
            View more
        </Button>
    )}
</div>

<div>
    {isFetchingNextPage && (
        <p>Loading more...</p>
    )}
</div>
*/
