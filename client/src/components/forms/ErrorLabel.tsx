import { mergeStyles } from "@/utils/mergeStyles"

import type { FC } from "react"

interface ErrorLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const ErrorLabel: FC<ErrorLabelProps> = ({
    children,
    className,
    ...restProps
}) => {
    return (
        <label
            {...restProps}
            className={mergeStyles(
                "block mb-2 text-sm font-medium text-red-700",
                className
            )}
        >
            {children}
        </label>
    )
}

export default ErrorLabel
