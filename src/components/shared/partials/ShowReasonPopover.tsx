import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MessageSquareWarning } from "lucide-react"

type TShowReasonPopoverProps = {
    reason: string | null;
}

export default function ShowReasonPopover({ reason }: TShowReasonPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <MessageSquareWarning size={15} className="text-destructive cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-80" align="center" side="right">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm leading-none">Reason</h4>
                        <p className="text-xs text-muted-foreground">{reason}</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
