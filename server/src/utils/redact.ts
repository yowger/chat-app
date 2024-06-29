import { klona } from "klona"
import traverse from "traverse"

import { testRegexArray } from "@/utils/testRegexArray"

export const redactObject = (obj: object, patterns: RegExp[]): void => {
    traverse(obj).forEach(function redactor() {
        const keyMatchesPattern = testRegexArray(this.key, patterns)

        if (keyMatchesPattern) {
            this.update("[REDACTED]")
        }
    })
}

export const redact = <T extends object>(obj: T, patterns: RegExp[]): T => {
    const copy = klona(obj)
    redactObject(copy, patterns)

    return copy
}
