"user client";
import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils';
import { setUserStatusAction } from '@/app/actions/user.actions';
import { mutate } from 'swr';
import { ENDPOINTS } from '@/constants/endpoints.types';
import useQueryParams from '@/hooks/useQueryParams';
import { useNotify } from '@/context/notification.context';

type TSetUserStatusProps = {
    userId: string;
    isActive: boolean;
}

const SetUserStatus = ({ userId, isActive }: TSetUserStatusProps) => {
    const { notify } = useNotify()
    const urlParams = useQueryParams();
    const queries = new URLSearchParams(urlParams);
    
    const handleUseChangeStatus = async () => {
        const response = await setUserStatusAction({ userId: userId });

        notify(response);
        if (response?.ok && response?.data?.isStatusUpdated) {
            mutate(`${ENDPOINTS.GET_ALL_USERS}?${queries.toString()}`);
        }
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Switch defaultChecked={isActive} id={userId} onCheckedChange={handleUseChangeStatus} />
            <Label htmlFor={userId} className={cn(
                !isActive && "text-red-600",
                "text-xs"
            )}>
                {isActive ? "Active" : "Disabled"}
            </Label>
        </div>
    )
}
export default SetUserStatus;