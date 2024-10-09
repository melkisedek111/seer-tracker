"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import useCustomSWR from '@/hooks/useCustomSWR';
import { ENDPOINTS } from '@/constants/endpoints.types';
import { getNotificationCountAction, getNotificationsAction, seenNotificationCountAction } from '@/app/actions/notification.actions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { mutate } from 'swr';
import { TNotification } from '@/types/notification.types';
import moment from 'moment';

const NotificationCountDropdown = () => {
    const { data } = useCustomSWR(ENDPOINTS.GET_NOTIFICATION_COUNTS, getNotificationCountAction);
    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<TNotification[]>([]);

    return (
        <DropdownMenu onOpenChange={async (open) => {
            if (open) {
                setLoading(true);
                const response = await seenNotificationCountAction({});
                if (response?.data?.isSeen) {
                    mutate(ENDPOINTS.GET_NOTIFICATION_COUNTS)
                }

                const notifications = await getNotificationsAction({});
                console.log(notifications)
                if (notifications?.ok) {
                    setNotifications(notifications?.data)
                }

                setLoading(false);
            }
        }}>
            <DropdownMenuTrigger asChild >
                <Button variant="outline" size="icon" className="capitalize p-1 relative">
                    <Bell size={16} />
                    {
                        !!data?.data?.notificationCount && <span className="text-[10px] absolute -top-1 -right-2 rounded-full bg-red-600 text-white size-5 grid place-items-center">{data?.data?.notificationCount}</span>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[400px]">
                <DropdownMenuLabel>Notification</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[350px] overflow-y-auto">
                    {
                        !notifications?.length && <DropdownMenuItem>
                            <p>No notifications found.</p>
                        </DropdownMenuItem>
                    }
                    {
                        notifications.map(notification => (
                            <DropdownMenuItem>
                                <div className="cursor-pointer w-full flex items-end gap-3">
                                    <div>
                                        <h5 className="font-semibold">{notification.title}</h5>
                                        <p className="text-wrap">{notification.message}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-right text-nowrap">{notification.createdAt ? moment(notification.createdAt).fromNow() : ""}</p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationCountDropdown