"user client";
import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils';
import { approvedUserAction, setUserStatusAction } from '@/app/actions/user.actions';
import { mutate } from 'swr';
import { ENDPOINTS } from '@/constants/endpoints.types';
import useQueryParams from '@/hooks/useQueryParams';
import { useNotify } from '@/context/notification.context';

type TApprovedUserProps = {
    userId: string;
    isApproved: boolean;
}

const ApprovedUser = ({ userId, isApproved }: TApprovedUserProps) => {
    const { notify } = useNotify()
    const urlParams = useQueryParams();
    const queries = new URLSearchParams(urlParams);
    
    const handleApprovedUser = async () => {
        const response = await approvedUserAction({ userId: userId });

        notify(response);
        if (response?.ok && response?.data?.isApprovedUser) {
            mutate(`${ENDPOINTS.GET_ALL_USERS}?${queries.toString()}`);
        }
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Switch defaultChecked={isApproved} id={userId} onCheckedChange={handleApprovedUser} />
            <Label htmlFor={userId} className={cn(
                !isApproved && "text-red-600",
                "text-xs italic"
            )}>
                To be approved
            </Label>
        </div>
    )
}
export default ApprovedUser;