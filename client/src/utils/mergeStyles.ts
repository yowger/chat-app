import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function mergeStyles(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
