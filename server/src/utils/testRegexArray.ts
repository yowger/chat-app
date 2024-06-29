export const testRegexArray = (str: string, patterns: RegExp[]): boolean => {
    if (str) {
        const isMatched = patterns.some((regex) => regex.test(str))

        return isMatched
    }
}
