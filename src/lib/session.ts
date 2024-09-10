import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "./lucia/auth";
import { Session, User } from "lucia";
import { redirect } from "next/navigation";

export const parsedObject = (data: any) => JSON.parse(JSON.stringify(data));

export const getUserSession = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return { user: null, session: null };

	try {
		const { user, session } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		return parsedObject({ user, session });
	} catch (error: any) {
		console.log("User Session is not set!");
		return { user: null, session: null };
	}
});

export async function checkUserSession() {
	const { user, session } = await getUserSession();

	if (!user || !session) {
		redirect("/store");
	}

	return;
}
