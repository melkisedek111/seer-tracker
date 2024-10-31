import { cn } from '@/lib/utils'
import { CheckCircle, CircleEllipsis, User } from 'lucide-react';
import moment from 'moment';
import React from 'react'
import ShowReasonPopover from './ShowReasonPopover';

type TUnitHeadRequestStatusProps = {
    approvedAt: Date | null;
    isCompletedDetails: boolean | null;
    fullName?: string | null;
    isRejected: boolean | null;
    reason: string | null;
    rejectedAt: Date | null;
}

const UnitHeadRequestStatus = ({ approvedAt, isCompletedDetails, fullName, isRejected, reason, rejectedAt }: TUnitHeadRequestStatusProps) => {
    return (
        <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
            <div className={cn(
                "absolute -left-[18px] rounded-full p-2 flex items-center justify-center",
                (approvedAt === null && rejectedAt === null) && "bg-muted-foreground",
                approvedAt && "bg-primary",
                rejectedAt && "bg-destructive"
            )}>
                <User size={19} className="text-white" />
            </div>
            <h5 className="font-semibold flex items-center gap-2">
                Unit Approval
                {
                    ((!approvedAt && !rejectedAt) && isCompletedDetails) && <CircleEllipsis size={15} className="text-yellow-600" />
                }
                {
                    (approvedAt && isRejected === null) && <CheckCircle size={15} className="text-green-600" />
                }
                {
                    isRejected && <ShowReasonPopover reason={reason} />
                }
            </h5>
            {
                isRejected === null ? <>
                    <p className="text-xs text-muted-foreground text-wrap break-words">Approved by: <span className="font-semibold text-green-500">{fullName || "TBD"}</span></p>
                    <p className="text-xs text-muted-foreground text-wrap break-words">Approved at: <span className="font-semibold">{approvedAt && moment(approvedAt).format('LLL') || "TBD"}</span></p>
                </> : <>
                    <p className="text-xs text-muted-foreground text-wrap break-words">Rejected by: <span className="font-semibold text-destructive">{fullName || "TBD"}</span></p>
                    <p className="text-xs text-muted-foreground text-wrap break-words">Rejected at: <span className="font-semibold">{rejectedAt && moment(rejectedAt).format('LLL') || "TBD"}</span></p>
                </>
            }
        </div>
    )
}

export default UnitHeadRequestStatus