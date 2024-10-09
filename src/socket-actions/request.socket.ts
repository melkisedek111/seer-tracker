"use server";
import { Socket, Server } from "socket.io";

export const sendRequestNotification = (socket: Socket, io: Server) => {
	socket.on("requestNotification", async (params) => {
		// ...
		console.log(params, "xxxxx");
		const data = {
			department: params.department,
			toNotifyDesignation: params.toNotifyDesignation,
			message: params.message,
			title: params.title,
			requestSourceId: params.requestSourceId,
			type: params.type
		};

		if (data.department && data.toNotifyDesignation) {
			const request = await fetch("http://localhost:3002/api/send-notification", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json'
				}
			})

			const response = await request.json();

			if (response?.data?.isNotificationSent) {
				io.emit("receiveNotification", {...response, data: {
					department: params.department,
					toNotifyDesignation: params.toNotifyDesignation,
					userToBeNotify: response?.data?.userToBeNotify || []
				}});
			}
		}
	});
};
