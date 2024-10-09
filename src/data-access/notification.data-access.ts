import Department, { DepartmentType } from "@/models/department.model";
import NotificationCount, { NotificationCountType } from "@/models/notification-count.model";
import Notification, { NotificationType } from "@/models/notification.model";
import Position, { PositionType } from "@/models/position.model";
import { TCreateDepartmentParams, TUpdateDepartmentParams } from "@/types/department.types";
import { TCreateNotification, TCreateNotificationCount, TGetNotificationCountParams, TSendNotificationParams, TUpdateNotificationCount } from "@/types/notification.types";
import mongoose, { FilterQuery } from "mongoose";

export const createManyNotification = async (params: TCreateNotification[]) => {
	return await Notification.create(params);
};

export const createManyNotificationCount = async (params: TCreateNotificationCount) => {
    return await NotificationCount.create(params);
}

export const updateNotificationCountById = async (params: Partial<TUpdateNotificationCount>) => {
    const { _id, ...otherParams } = params;
    return await NotificationCount.updateOne(
        { _id: params._id },
        { ...otherParams }
    )
}

export const getNotificationCountsByParams = async (params: FilterQuery<NotificationCountType>) => {
    return await NotificationCount.find(params).lean();
}

export const getNotificationCountByParams = async (params: FilterQuery<NotificationCountType>) => {
    return await NotificationCount.findOne(params);
}

export const getNotificationsByParams = async (params: FilterQuery<NotificationType>) => {
    return await Notification.find(params).sort({ createdAt: -1 }).lean();
}