import { FieldValues, useController, UseControllerProps } from "react-hook-form"

import ErrorLabel from "@/components/forms/ErrorLabel"
import { Input, InputProps } from "@/components/ui/Input"

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<InputProps, "value" | "defaultValue">

export function FormInput<T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    ...props
}: FormInputProps<T>) {
    const { field, fieldState } = useController<T>({
        name,
        control,
        defaultValue,
        rules,
        shouldUnregister,
    })

    return (
        <div className="space-y-2">
            <Input {...field} {...props} />
            {fieldState.error && (
                <ErrorLabel>{fieldState.error.message}</ErrorLabel>
            )}
        </div>
    )
}
