export const buttonSizes = {
    small: "small",
    normal: "normal",
    large: "large",
} as const

export const buttonVariants = {
    default: "default",
    destructive: "destructive",
    secondary: "secondary",
    ghost: "ghost",
    outline: "outline",
    link: "link",
} as const

export const buttonRoundness = {
    normal: "normal",
    full: "full",
} as const

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes
export type ButtonRoundness = keyof typeof buttonRoundness

export type ButtonStyles = {
    base: string
    size: Record<ButtonSize, string>
    roundness: Record<ButtonRoundness, string>
    variant: Record<ButtonVariant, string>
}
