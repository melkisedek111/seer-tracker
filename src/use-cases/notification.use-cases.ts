import { CustomThrowError } from "@/app/actions/server-action.helper";
import { getUserSession } from "@/app/lib/session";
import { getDepartmentByParams } from "@/data-access/department.data-access";
import { getDesignationsByParams } from "@/data-access/designation.data-access";
import {
	createManyNotification,
	createManyNotificationCount,
	getNotificationCountByParams,
	getNotificationCountsByParams,
	getNotificationsByParams,
	updateNotificationCountById,
} from "@/data-access/notification.data-access";
import {
	TCreateNotification,
	TNotification,
	TSendNotificationParams,
} from "@/types/notification.types";

export const sendNotificationUseCase = async (
	params: TSendNotificationParams
) => {
	const department = await getDepartmentByParams({ _id: params.department });

	if (!department) throw new CustomThrowError("Department does not exists");

	const designations = await getDesignationsByParams({
		department: department._id,
		designation: params.toNotifyDesignation,
		isActive: true,
		isDeleted: false,
	});

	const data = designations?.map((designation) => ({
		user: designation.user,
		title: params.title,
		message: params.message,
		requestSourceId: params.requestSourceId,
		type: params.type,
	})) as TCreateNotification[];

	const userIds = data.map((data) => data.user);

	const notifications = await createManyNotification(data);

	const notificationCount = await getNotificationCountsByParams({
		user: { $in: userIds },
		isSeen: false,
	});

	for (const userId of userIds) {
		const userWithNotifyCount = notificationCount.find(
			(notif) => notif.user.toString() === userId.toString()
		);
		if (userWithNotifyCount) {
			await updateNotificationCountById({
				_id: userWithNotifyCount._id as string,
				user: userWithNotifyCount.user,
				count: userWithNotifyCount.count + 1,
				isSeen: userWithNotifyCount.isSeen,
			});
		} else {
			const createdNotificationCount = await createManyNotificationCount({
				user: userId,
				count: 1,
				isSeen: false,
			});
		}
	}

	if (!notifications)
		throw new CustomThrowError(
			"Can't send notification, Please refresh the page."
		);

	return { isNotificationSent: true, userToBeNotify: userIds };
};

export const getNotificationCountUseCase = async () => {
	const { user } = await getUserSession();
	if(!user) throw new CustomThrowError("User not found");
	const notificationCount = await getNotificationCountByParams({ user: user.id, isSeen: false });
	return { notificationCount: notificationCount?.count || 0 };
}

export const getNotificationsUseCase = async () => {
	const { user } = await getUserSession();
	if(!user) throw new CustomThrowError("User not found");
	const notifications = await getNotificationsByParams({ user: user.id }) as TNotification[];
	return notifications;
}


export const seenNotificationCountUseCase = async () => {
	const { user } = await getUserSession();
	if(!user) throw new CustomThrowError("User not found");
	const notificationCount = await getNotificationCountByParams({ user: user.id, isSeen: false });

	if(notificationCount) {
		const isSeen = await updateNotificationCountById(
			{ _id: notificationCount._id, isSeen: true }, 
		)

		return { isSeen: !!isSeen.modifiedCount };
	}

	return { isSeen: false };
}