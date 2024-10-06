import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Check, CheckCircle, CheckCircle2, CircleEllipsis, Info, User, UserCog, UserCog2, UserPen, UserSquare, UserSquare2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { TGetAllRequestReturn } from '@/types/request.types';
import moment from "moment";
import { getInitials } from '@/lib/string.helper'
import PlateEditorRead from './PlateJSEditorRead'
import { cn } from '@/lib/utils'
import { PRIORITY_LEVEL, SERVICE_CATEGORIES } from '@/constants/index.constants'

const RequestCard = (props: TGetAllRequestReturn) => {
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
                        <h5 className="!group-hover:bg-muted">
                            {
                                props?.problemDetails?.length && <PlateEditorRead value={props?.problemDetails} />
                            }
                        </h5>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Request Process</p>
                        <div className="pl-4">
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className={cn(
                                    "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                                    props.requestProcess?.filingUp?.isCompleted ? "bg-primary" : "bg-muted-foreground"
                                )}>
                                    <Info size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold flex items-center gap-2">
                                    Request Details
                                    <CheckCircle size={15} className="text-green-600" />
                                </h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Filling up the request details</p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className={cn(
                                    "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                                    props.requestProcess?.unitApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
                                )}>
                                    <User size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold flex items-center gap-2">
                                    Unit Approval
                                    {
                                        (!props.requestProcess?.unitApproval?.approvedAt && props.requestProcess?.filingUp?.isCompleted) && <CircleEllipsis size={15} className="text-yellow-600" />
                                    }
                                    {
                                        props.requestProcess?.unitApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                                    }
                                </h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.requestProcess.unitApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
                            </div>
                            {
                                props.serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES && <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                    <div className={cn(
                                        "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                                        props.requestProcess?.recommendingApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
                                    )}>
                                        <UserPen size={19} className="text-white" />
                                    </div>
                                    <h5 className="font-semibold flex items-center gap-2">
                                        Recommending Approval
                                        {
                                            (props.requestProcess?.unitApproval?.approvedAt && !props.requestProcess?.recommendingApproval?.approvedAt) && <CircleEllipsis size={15} className="text-yellow-600" />
                                        }
                                        {
                                            props.requestProcess?.recommendingApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                                        }
                                    </h5>
                                    <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.requestProcess.recommendingApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
                                </div>
                            }
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className={cn(
                                    "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                                    props.requestProcess?.serviceUnitApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
                                )}>
                                    {
                                        props.serviceCategory === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM && <UserSquare size={19} className="text-white" />
                                    }

                                    {
                                        props.serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES && <UserCog size={19} className="text-white" />
                                    }

                                </div>
                                <h5 className="font-semibold flex items-center gap-2">
                                    {
                                        props.serviceCategory === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM && "MIS Approval"
                                    }

                                    {
                                        props.serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES && "Service Approval"
                                    }
                                    {
                                        (props.requestProcess?.recommendingApproval?.approvedAt && !props.requestProcess?.serviceUnitApproval?.approvedAt) && <CircleEllipsis size={15} className="text-yellow-600" />
                                    }

                                    {
                                        props.requestProcess?.serviceUnitApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                                    }
                                </h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.requestProcess.serviceUnitApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className={cn(
                                    "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                                    props.requestProcess?.assignedPerson?.assignedAt ? "bg-primary" : "bg-muted-foreground"
                                )}>
                                    <UserSquare2 size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold flex items-center gap-2">
                                    Assigned Person
                                    {
                                        (props.requestProcess?.serviceUnitApproval?.approvedAt && !props.requestProcess?.assignedPerson?.assignedTo) && <CircleEllipsis size={15} className="text-yellow-600" />
                                    }
                                    {
                                        props.requestProcess?.assignedPerson?.assignedTo && <CheckCircle size={15} className="text-green-600" />
                                    }
                                </h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">
                                    {props.requestProcess.assignedPerson.assignedTo?.fullName || "Waiting for the assigned personnel"}
                                </p>
                            </div>
                            <div className="relative pl-7">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <CheckCircle2 size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold flex items-center gap-2">Complete</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Waiting for other process to be completed</p>
                            </div>
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

export default RequestCard