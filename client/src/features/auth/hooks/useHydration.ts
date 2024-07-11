import { useEffect, useState } from "react"

import { useAuthStoreBase } from "../store/auth"

export const useHydration = () => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        const unsubHydrate = useAuthStoreBase.persist.onHydrate(() =>
            setHydrated(false)
        )

        const unsubFinishHydration = useAuthStoreBase.persist.onFinishHydration(
            () => setHydrated(true)
        )

        setHydrated(useAuthStoreBase.persist.hasHydrated())

        return () => {
            unsubHydrate()
            unsubFinishHydration()
        }
    }, [])

    return hydrated
}
