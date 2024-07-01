import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { ButtonHTMLAttributes } from "react"
import type {
    ButtonRoundness,
    ButtonSize,
    ButtonStyles,
    ButtonVariant,
} from "./types/button"

const buttonStyles: ButtonStyles = {
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    size: {
        small: "h-9 rounded-md px-3",
        normal: "h-10 px-4 py-2",
        large: "h-11 rounded-md px-8",
    },
    roundness: {
        normal: "rounded-md",
        full: "rounded-full",
    },
    variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    },
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    roundness?: ButtonRoundness
    children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "default",
            size = "normal",
            roundness = "normal",
            className,
            children,
            ...restProps
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    buttonStyles.base,
                    buttonStyles.size[size],
                    buttonStyles.roundness[roundness],
                    buttonStyles.variant[variant],
                    className
                )}
                {...restProps}
            >
                {children}
            </button>
        )
    }
)

export { Button }
