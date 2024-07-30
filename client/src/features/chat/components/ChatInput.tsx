import { useRef } from "react"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import ReactTextareaAutosize from "react-textarea-autosize"

import { Button } from "@/components/ui/button/Button"

interface ChatInputProps {
    disabled: boolean
    onChange: () => void
    onClick: (text: string) => void
}

export default function ChatInput(props: ChatInputProps) {
    const { disabled = false, onChange, onClick } = props

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleClick = () => {
        if (inputRef.current) {
            const text = inputRef.current.value

            onClick(text)

            inputRef.current.value = ""
        }
    }

    return (
        <div className="px-4 py-3">
            <div>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                    Search
                </label>

                <div className="relative">
                    <ReactTextareaAutosize
                        onChange={onChange}
                        maxRows={5}
                        ref={inputRef}
                        className="resize-none block pl-3 pr-12 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />

                    <Button
                        className="absolute end-[10px] bottom-[10px] size-9 p-0"
                        roundness="full"
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        <PaperAirplaneIcon className="size-5 w-full" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
