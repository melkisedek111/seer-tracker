import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Session, User } from "lucia";
import { adapter } from "@/models/user.model";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes: any) => {
		return {
			_id: attributes._id,
			firstName: attributes.firstName,
			middleName: attributes.middleName,
			lastName: attributes.lastName,
			role: attributes.role,
			avatar: attributes.avatar,
			email: attributes.email,
			isActive: attributes.isActive,
			isApproved: attributes.isApproved
		};
	},
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
		} catch {}
		return result;
	}
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
interface DatabaseUserAttributes {
    _id: string;
	email: string;
    fullName: string;
	avatar: string | null;
    role: string;
	isActive: boolean;
	isApproved: boolean;
}