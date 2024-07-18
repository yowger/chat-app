import { Fragment } from "react"

import { useGetUsers } from "../api/useGetUsers"

import Avatar from "@/components/ui/Avatar"

import type { Recipient } from "../types/User"
import { mergeStyles } from "@/utils/mergeStyles"

interface SearchUserListProps {
    username: string
    activeRecipients?: Array<Recipient>
    onUserClick: (recipient: Recipient) => void
}

const SearchUserList = (props: SearchUserListProps) => {
    const { activeRecipients, username, onUserClick } = props

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
        <ul className="space-y-1">
            {data?.pages.map((page, pageIndex) => (
                <Fragment key={`search-list-${pageIndex}`}>
                    {page.users.map((user) => {
                        const isRecipientActive = !!activeRecipients?.some(
                            (recipient) => recipient._id === user._id
                        )

                        return (
                            <li
                                key={`search-item-${user._id}`}
                                onClick={() =>
                                    onUserClick({
                                        _id: user._id,
                                        username: user.username,
                                    })
                                }
                                className={mergeStyles(
                                    "flex items-center overflow-hidden p-1.5 rounded-md cursor-pointer min-w-0",
                                    isRecipientActive
                                        ? "bg-blue-100"
                                        : "hover:bg-gray-600/10"
                                )}
                            >
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
                        )
                    })}
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
