import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Check, CheckCircle, CheckCircle2, CircleEllipsis, Info, User, UserCog, UserCog2, UserPen, UserSquare, UserSquare2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { TRequestProcess } from '@/types/request.types'
import { PRIORITY_LEVEL, SERVICE_CATEGORIES } from '@/constants/index.constants'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/string.helper'
import PlateEditorRead from './PlateJSEditorRead'
import GetCurrentProcess from '@/app/components/GetCurrentProcess'

export type TRequestCardInsightProps = {
    _id: string;
    title: string;
    userId: string;
    problemType: string;
    services: string[];
    otherProblem: string;
    otherService: string;
    startDate: Date;
    endDate: Date;
    requestorName: string;
    department: string;
    requestUniqueId: string;
    serviceCategory: string;
    problemDetails: string;
    requestProcess: TRequestProcess;
    createdAt: Date;
    priorityLevel: string;
    avatar: string;
}

const RequestCardInsight = (props: TRequestCardInsightProps) => {
    return (
        <Card className="hover:bg-muted transition ease-in-out duration-300">
            <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-base text-orange-600">{props.title}</h4>
                        <p className="text-xs text-muted-foreground">{moment(props.createdAt).fromNow()}</p>
                    </div>
                    <div className={cn(
                        "capitalize text-lg font-semibold text-right leading-4",
                        props.priorityLevel === PRIORITY_LEVEL.HIGH && "text-red-600",
                        props.priorityLevel === PRIORITY_LEVEL.NORMAL && "text-blue-600",
                        props.priorityLevel === PRIORITY_LEVEL.LOW && "text-gray-600",
                    )}>
                        {props.priorityLevel}
                        <p className="text-xs text-muted-foreground">Priority Level</p>
                    </div>
                </div>
                <div className="space-y-0">
                    <h1 className="text-center text-xl font-bold">{props.problemType || props.services.join(", ")}</h1>
                    <div className="grid grid-cols-2">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <h5 className="font-semibold">{props.startDate ? moment(props.startDate).format("MM/DD/YYYY h:mmA") : "TBD"}</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <h5 className="font-semibold">{props.endDate ? moment(props.endDate).format("MM/DD/YYYY h:mmA") : "TBD"}</h5>
                        </div>
                    </div>
                </div>
                <div className="space-y-3 mt-3">
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Requested By</p>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={props.avatar || "#"} alt="@shadcn" />
                                <AvatarFallback>{getInitials(props.requestorName)}</AvatarFallback>
                            </Avatar>
                            <h5 className="font-semibold">{props.requestorName}</h5>
                        </div>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Department or Unit</p>
                        <h5 className="font-semibold">{props.department}</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Requested ID</p>
                        <h5 className="font-semibold">{props.requestUniqueId.toUpperCase()}</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Service Category</p>
                        <h5 className="font-semibold">{props.serviceCategory}</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Request Details/Description of Work/Problem</p>
                        <h5 className="!group-hover:bg-muted max-h-[300px] overflow-y-auto">
                            {
                                props?.problemDetails?.length && <PlateEditorRead value={props?.problemDetails} />
                            }
                        </h5>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Current Process</p>
                        <div className="pl-4">
                            <GetCurrentProcess props={props.requestProcess} serviceCategory={props.serviceCategory} />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-10">
                        <Button variant={"destructive"}>
                            <X />
                            Reject
                        </Button>
                        <Button variant={"default"}>
                            <Check />
                            Approve
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RequestCardInsight