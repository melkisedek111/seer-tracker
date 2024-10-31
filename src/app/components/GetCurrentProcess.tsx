import { SERVICE_CATEGORIES } from '@/constants/index.constants'
import { cn } from '@/lib/utils'
import { TRequestProcess } from '@/types/request.types'
import { CheckCircle, CircleEllipsis, Info, User, UserCog, UserPen, UserSquare, UserSquare2 } from 'lucide-react'
import React from 'react'

const GetCurrentProcess = ({ props, serviceCategory }: { props: TRequestProcess, serviceCategory: string }) => {

    if (props.assignedPerson.assignedBy?.fullName) {
        return <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
            <div className={cn(
                "rounded-full p-2 bg-primary flex items-center justify-center",
                props.assignedPerson?.assignedAt ? "bg-primary" : "bg-muted-foreground"
            )}>
                <UserSquare2 size={19} className="text-white" />
            </div>
           <div>
           <h5 className="font-semibold flex items-center gap-2">
                Assigned Person
                {
                    (props.serviceUnitApproval?.approvedAt && !props.assignedPerson?.assignedTo) && <CircleEllipsis size={15} className="text-yellow-600" />
                }
                {
                    props.assignedPerson?.assignedTo && <CheckCircle size={15} className="text-green-600" />
                }
            </h5>
            <p className="text-sm text-muted-foreground text-wrap break-words">
                {props.assignedPerson.assignedTo?.fullName || "Waiting for the assigned personnel"}
            </p>
           </div>
        </div>
    } else if (props.serviceUnitApproval.acknowledgeBy?.fullName) {
        return <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
            <div className={cn(
                "rounded-full p-2 bg-primary flex items-center justify-center",
                props?.serviceUnitApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
            )}>
                {
                    serviceCategory === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM && <UserSquare size={19} className="text-white" />
                }

                {
                    serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES && <UserCog size={19} className="text-white" />
                }

            </div>
            <div>
                <h5 className="font-semibold flex items-center gap-2">
                    {
                        serviceCategory === SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM && "MIS Approval"
                    }

                    {
                        serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES && "Service Approval"
                    }
                    {
                        (props?.recommendingApproval?.approvedAt && !props?.serviceUnitApproval?.approvedAt) && <CircleEllipsis size={15} className="text-yellow-600" />
                    }

                    {
                        props?.serviceUnitApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                    }
                </h5>
                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.serviceUnitApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
            </div>
        </div>
    } else if (props?.recommendingApproval?.approvedAt) {
        if (serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES) {
            return <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
                <div className={cn(
                    "rounded-full p-2 bg-primary flex items-center justify-center",
                    props?.recommendingApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
                )}>
                    <UserPen size={19} className="text-white" />
                </div>
                <div>
                    <h5 className="font-semibold flex items-center gap-2">
                        Recommending Approval
                        {
                            (props?.unitApproval?.approvedAt && !props?.recommendingApproval?.approvedAt) && <CircleEllipsis size={15} className="text-yellow-600" />
                        }
                        {
                            props?.recommendingApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                        }
                    </h5>
                    <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.recommendingApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
                </div>
            </div>
        }
    } else if (props?.unitApproval?.approvedAt) {
        return <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
            <div className={cn(
                "rounded-full p-2 bg-primary flex items-center justify-center",
                props?.unitApproval?.approvedAt ? "bg-primary" : "bg-muted-foreground"
            )}>
                <User size={19} className="text-white" />
            </div>
            <div>
                <h5 className="font-semibold flex items-center gap-2">
                    Unit Approval
                    {
                        (!props?.unitApproval?.approvedAt && props?.filingUp?.isCompleted) && <CircleEllipsis size={15} className="text-yellow-600" />
                    }
                    {
                        props?.unitApproval?.approvedAt && <CheckCircle size={15} className="text-green-600" />
                    }
                </h5>
                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>{props.unitApproval.acknowledgeBy?.fullName || "TBD"}</span></p>
            </div>
        </div>
    } else if (props?.filingUp?.isCompleted) {
        return <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
            <div className={cn(
                "rounded-full p-2 bg-primary flex items-center justify-center",
                props?.filingUp?.isCompleted ? "bg-primary" : "bg-muted-foreground"
            )}>
                <Info size={19} className="text-white" />
            </div>
            <div>
                <h5 className="font-semibold flex items-center gap-2">
                    Request Details
                    <CheckCircle size={15} className="text-green-600" />
                </h5>
                <p className="text-sm text-muted-foreground text-wrap break-words">Filling up the request details</p>
            </div>
        </div>
    }
}

export default GetCurrentProcess