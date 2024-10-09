"use server";
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "../../lib/lucia/auth";
import { Session, User } from "lucia";
import { redirect } from "next/navigation";
import { Response } from "@/app/actions/server-action.helper";
import { getDesignationByUser } from "@/data-access/designation.data-access";
import { TDesignation } from "@/types/designation.types";

type TUserSession = {
	user: User | null;
	session: Session | null;
}

export const parsedObject = (data: any) => JSON.parse(JSON.stringify(data));

export const getUserSession = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return { user: null, session: null };
	let userDetails: User & { designation: string };
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

		if(user) {
			const designation = await getDesignationByUser({ userId: user.id, departmentId: user.department }) as TDesignation;

			if(designation) {
				user.designation = designation.designation as any
			}
		}
		
		return parsedObject({ user, session });
	} catch (error: any) {
		console.log("User Session is not set!");
		return { user: null, session: null }
	}
});

export async function checkUserSession() {
	// const { data } = await getUserSession();
	// data.
	// // if (!data?.data?.user || !session) {
	// // 	redirect("/store");
	// // }

	// return;
}
