export const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}
