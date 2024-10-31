import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { MouseEvent, useState } from "react"

type RejectAlertDialogProps = {
    action: (reason: string) => Promise<boolean>;
    title: string;
}

export default function RejectAlertDialog({ action, title }: RejectAlertDialogProps) {
    const [reason, setReason] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const handleAction = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!reason) return;
        const isOpen = await action(reason);
        setOpen(isOpen)
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                    <X size={18} />
                    Reject
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>You are about to reject the request: <span className="text-destructive">{title}</span></AlertDialogTitle>
                    <AlertDialogDescription>
                        Please state your reason below for rejecting the request.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea placeholder="Your reason . . ." onChange={(e) => setReason(e.target.value)} value={reason} />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={"destructive"} onClick={handleAction} disabled={!reason}>
                        <X size={18} />
                        Reject
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
