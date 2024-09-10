import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { MapPinHouse } from 'lucide-react'
import { cn } from '@/lib/utils'

const DesignationCard = (props: any) => {
    return (
        <Card className="p-4 space-y-4">
            <div className="flex gap-3">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${props.fullName}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <div>
                        <h1 className="text-xl font-bold">{props.fullName}</h1>
                        <p className="text-muted-foreground">{props.position}</p>
                        <p className="text-muted-foreground">Emp No. {props.employeeNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinHouse size={18} />
                        <p className="text-sm">{props.homeAddress}</p>
                    </div>
                    <Badge>
                        {props.designation}
                    </Badge>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <div className={cn("w-4 h-4 rounded-full", props.isDisabled ? "bg-muted-foreground" : "bg-green-600")} />
                    <p className={cn(props.isDisabled ? "text-muted-foreground" : "text-green-600")}>{props.isDisabled ? "Disabled" : "Active"}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" checked={props.isDisabled} />
                </div>
            </div>
        </Card>
    )
}

export default DesignationCard