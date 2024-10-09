"use server";
import ServerAction, {
	ParsedError,
	Response,
} from "@/app/actions/server-action.helper";
import { TNotification, TSendNotificationParams } from "@/types/notification.types";
import {
	getNotificationCountUseCase,
	getNotificationsUseCase,
	seenNotificationCountUseCase,
	sendNotificationUseCase,
} from "@/use-cases/notification.use-cases";

export const sendNotificationAction = ServerAction<
	{ isNotificationSent: boolean },
	TSendNotificationParams
>(async (params) => {
	try {
		const notification = await sendNotificationUseCase(params);
		return Response<{ isNotificationSent: boolean }>({
			data: notification,
			message: "You have new notification.",
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const getNotificationCountAction = ServerAction<
	Awaited<ReturnType<typeof getNotificationCountUseCase>>,
	any
>(async () => {
	try {
		const notification = await getNotificationCountUseCase();
		return Response<Awaited<ReturnType<typeof getNotificationCountUseCase>>>({
			data: notification,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const seenNotificationCountAction = ServerAction<
	Awaited<ReturnType<typeof seenNotificationCountUseCase>>,
	any
>(async () => {
	try {
		const notification = await seenNotificationCountUseCase();
		return Response<Awaited<ReturnType<typeof seenNotificationCountUseCase>>>({
			data: notification,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

export const getNotificationsAction = ServerAction<
	TNotification[],
	any
>(async () => {
	try {
		const notification = await getNotificationsUseCase();
		return Response<TNotification[]>({
			data: notification,
		});
	} catch (error) {
		return ParsedError(error);
	}
});

// export const sendNotificationAction = async (
// 	params: TSendNotificationParams
// ) => {
// 	try {
// 		const notification = await sendNotificationUseCase(params);
// 		return Response<any>({
// 			data: notification,
// 		});
// 	} catch (error) {
// 		return ParsedError(error);
// 	}
// };
