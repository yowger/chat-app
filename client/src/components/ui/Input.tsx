import { forwardRef } from "react"

import { mergeStyles } from "@/utils/mergeStyles"

import type { InputHTMLAttributes } from "react"

const inputSizes = {
    small: "small",
    normal: "normal",
    large: "large",
} as const

export type ButtonSize = keyof typeof inputSizes

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: ButtonSize
}

const inputClasses = {
    size: {
        small: "h-8 text-sm px-2 py-1",
        normal: "h-10 text-base px-3 py-2",
        large: "h-12 text-lg px-4 py-3",
    },
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, size = inputSizes.normal, ...props }, ref) => {
        return (
            <input
                type={type}
                className={mergeStyles(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
                    inputClasses.size[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
