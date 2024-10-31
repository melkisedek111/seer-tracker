"use client";
import React from 'react'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { acknowledgeRequestAction } from '@/app/actions/request.actions';
import { ACKNOWLEDGE_TYPE, REQUEST_PROCESS } from '@/constants/index.constants';
import { useNotify } from '@/context/notification.context';
import { useUserSession } from '@/context/session.context';

type TAcknowledgeRequestByMISButtonProps = {
    requestId: string;
    departmentId: string;
    serviceCategory: string;
    userId: string;
    title: string;
}

const AcknowledgeRequestByMISButton = ({ requestId, serviceCategory, title, userId  }: TAcknowledgeRequestByMISButtonProps) => {
    const { notify } = useNotify();

    const handleAcknowledgeRequest = async () => {
        const response = await acknowledgeRequestAction({
            acknowledgeType: ACKNOWLEDGE_TYPE.APPROVED,
            requestId: requestId,
            processType: REQUEST_PROCESS.SERVICE_APPROVAL,
            serviceCategory: serviceCategory
        });
        notify(response);

    }
    return (
        <>
            <Button variant={"destructive"}>
                <X size={18} />
                Reject
            </Button>
            <Button variant={"default"} onClick={handleAcknowledgeRequest}>
                <Check size={18} />
                Approve
            </Button>
        </>
    )
}

export default AcknowledgeRequestByMISButton