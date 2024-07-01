import { mergeStyles } from "@/utils/mergeStyles"

import type { FC } from "react"

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<LabelProps> = ({ children, className, ...restProps }) => {
    return (
        <label
            {...restProps}
            className={mergeStyles(
                "block mb-2 text-sm font-medium text-gray-900",
                className
            )}
        >
            {children}
        </label>
    )
}

export default Label
