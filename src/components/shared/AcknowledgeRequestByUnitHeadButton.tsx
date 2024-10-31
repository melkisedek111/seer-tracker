"use client";
import React from 'react'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { acknowledgeRequestAction } from '@/app/actions/request.actions';
import { ACKNOWLEDGE_TYPE, DESIGNATIONS, NOTIFICATION_TYPE, REQUEST_PROCESS, SERVICE_CATEGORIES } from '@/constants/index.constants';
import { useNotify } from '@/context/notification.context';
import { socket } from '@/socket';
import { useUserSession } from '@/context/session.context';
import useQueryParams from '@/hooks/useQueryParams';
import { mutate } from 'swr';
import { ENDPOINTS } from '@/constants/endpoints.types';
import RejectAlertDialog from './partials/RejectAlertDialog';

type TAcknowledgeRequestByUnitHeadButtonProps = {
    requestId: string;
    departmentId: string;
    serviceCategory: string;
    userId: string;
    title: string;
}

const AcknowledgeRequestByUnitHeadButton = ({ requestId, serviceCategory, title, userId }: TAcknowledgeRequestByUnitHeadButtonProps) => {
    const { notify } = useNotify();
    const { user, designation } = useUserSession();
    const urlParams = useQueryParams();

    const handleRejectRequest = async (reason: string) => {
        const response = await acknowledgeRequestAction({
            acknowledgeType: ACKNOWLEDGE_TYPE.REJECTED,
            requestId: requestId,
            rejectReason: reason,
            processType: REQUEST_PROCESS.UNIT_APPROVAL
        });

        notify(response);

        if (response?.ok && response?.data?.isAcknowledged) {
            mutate(`${ENDPOINTS.GEL_ALL_REQUESTS}?${urlParams.toString()}`);

            // notify requestor
            socket.emit("requestNotification", {
                toNotifyRequestorId: userId,
                message: `Request has been rejected by ${user?.firstName} ${user?.lastName}`,
                title: "Request rejected by your Unit Head",
                requestSourceId: requestId,
                type: NOTIFICATION_TYPE.REJECTED
            })
        }

        return false;
    }

    const handleAcknowledgeRequest = async () => {
        const response = await acknowledgeRequestAction({
            acknowledgeType: ACKNOWLEDGE_TYPE.APPROVED,
            requestId: requestId,
            processType: REQUEST_PROCESS.UNIT_APPROVAL
        });

        notify(response);

        if (response?.ok && response?.data?.isAcknowledged) {
            let notifyDesignation = DESIGNATIONS.SERVICE_APPROVER;

            if (serviceCategory === SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES) {
                notifyDesignation = DESIGNATIONS.RECOMMENDING_APPROVER;
            }
            mutate(`${ENDPOINTS.GEL_ALL_REQUESTS}?${urlParams.toString()}`);
            // notify the approver
            socket.emit("requestNotification", {
                department: serviceCategory,
                toNotifyDesignation: notifyDesignation,
                message: `A request has been approved by ${user?.firstName} ${user?.lastName} (${designation})`,
                title: "Request to be Approved by Service Unit",
                requestSourceId: requestId,
                type: NOTIFICATION_TYPE.TO_APPROVED_REQUEST
            });

            // notify requestor
            socket.emit("requestNotification", {
                toNotifyRequestorId: userId,
                message: `Request has been approved by ${user?.firstName} ${user?.lastName}`,
                title: "Request approved by your Unit Head",
                requestSourceId: requestId,
                type: NOTIFICATION_TYPE.UNIT_APPROVED
            })
        }
    }
    return (
        <>
            <RejectAlertDialog title={title} action={handleRejectRequest} />
            <Button variant={"default"} onClick={handleAcknowledgeRequest}>
                <Check size={18} />
                Approve
            </Button>
        </>
    )
}

export default AcknowledgeRequestByUnitHeadButton