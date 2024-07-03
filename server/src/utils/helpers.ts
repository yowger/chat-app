export const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const calculateElapsedTimeInSecs = (
    requestStartTime: number
): number => {
    const endTime = Date.now() - requestStartTime
    return endTime / 1000
}
