import { Button } from "@/components/ui/button/Button"
import { IconSend2 } from "@tabler/icons-react"
import ReactTextareaAutosize from "react-textarea-autosize"

export default function ChatInput() {
    return (
        <div className="bg-gray-300 px-4 py-3">
            <div>
                <form className="">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <ReactTextareaAutosize
                            maxRows={5}
                            className="resize-none block pl-3 pr-12 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />

                        <Button
                            className="absolute end-[10px] bottom-[10px] size-9 p-0"
                            roundness="full"
                        >
                            <IconSend2 size={18} />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
