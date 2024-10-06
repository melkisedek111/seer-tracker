import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MapPinHouse, SquareUser } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/string.helper'
import { DESIGNATION_BG_COLOR } from '@/constants/index.constants'

const DesignationCard = (props: any) => {
    return (
        <Card className="p-4 space-y-4">
            <div className="flex gap-3">
                <Avatar className="size-16">
                    <AvatarImage src={props.avatar} className="object-cover" />
                    <AvatarFallback>{getInitials(props.fullName)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <div>
                        <h1 className="text-xl font-bold">{props.fullName}</h1>
                        <p className="text-muted-foreground">{props.position}</p>
                        <p className="text-muted-foreground">Emp No. {props.employeeNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SquareUser size={18} />
                        <p className="text-sm">{props.position}</p>
                    </div>
                    <Badge className={cn(
                        DESIGNATION_BG_COLOR[props.designation.designation]
                    )}>
                        {props.designation.designation}
                    </Badge>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <div className={cn("w-4 h-4 rounded-full", props.designation.isActive ? "bg-muted-foreground" : "bg-green-600")} />
                    <p className={cn(props.designation.isActive ? "text-muted-foreground" : "text-green-600")}>{props.designation.isActive ? "Disabled" : "Active"}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" checked={props.designation.isActive} />
                </div>
            </div>
        </Card>
    )
}

export default DesignationCard