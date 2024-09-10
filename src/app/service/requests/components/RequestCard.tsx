"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, Eye, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const RequestCard = () => {
    const router = useRouter();
    const handleLink = () => {
        router.push("/service/requests/qwe")
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    }
    return (
        <Card className="p-4 space-y-4 hover:bg-muted cursor-pointer" onClick={handleLink}>
            <div className="flex gap-3">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Callie" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-semibold text-orange-600">No network connection</h1>
                    <p className="text-sm text-muted-foreground">Requested By: <span className="font-semibold">Evelyn Rodriguez</span></p>
                    <p className="text-sm text-muted-foreground">Department: <span className="font-semibold">DICT</span></p>
                    <p className="text-sm text-muted-foreground">Request ID: <span className="font-semibold">20230115-0001</span></p>
                    <p className="text-sm text-muted-foreground mt-2">Requested At: <span className="font-semibold text-green-600">2 minutes ago</span></p>
                    <p className="text-sm text-muted-foreground">Process Status: <span className="font-semibold text-yellow-600">Unit Approval</span></p>
                </div>
            </div>
            <div className="flex items-center justify-around">
                <Button size={"sm"} variant={"destructive"} className="flex items-center gap-3" onClick={handleClick}>
                    <X size={18} />
                    Reject
                </Button>
                <Button size={"sm"} className="flex items-center gap-3" onClick={handleClick}>
                    <CheckCircle size={18} />
                    Accept
                </Button>
            </div>
        </Card>
    )
}

export default RequestCard