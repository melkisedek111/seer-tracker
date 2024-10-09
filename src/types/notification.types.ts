import { TRequest } from "./request.types";
import { TUser } from "./user.types";

export type TNotification = {
    _id: string;
    user: TUser | string;
    userSourceId: TUser | string | null;
    requestSourceId: TRequest | string | null;
    title: string;
    message: string;
    createdAt: string;
}

export type TSendNotificationParams = {
    department: string;
    toNotifyDesignation: string;
    message: string;
    title: string;
    type: string;
    requestSourceId: string;
}

export type TCreateNotification = {
    user: string;
    title: string;
    message: string;
    requestSourceId: string | null;
    userSourceId: string | null;
    type: string;
}   


export type TCreateNotificationCount = {
    user: string;
    count: number;
    isSeen: false;
}

export type TUpdateNotificationCount = {
    _id: string;
    user: string;
    count: number;
    isSeen: boolean;
}

export type TGetNotificationCountParams = {
    _id: string;
    user: string;
    count: number;
    isSeen: boolean;
}

