"use server";
import ServerAction, { CustomThrowError, ParsedError, Response } from "@/app/actions/server-action.helper";
import { TSignInParams } from "@/types/auth.types";
import { signInUseCase } from "@/use-cases/auth.use-cases";
import { getUserSession } from "../lib/session";
import { lucia } from "@/lib/lucia/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (params: TSignInParams) => {

	try {
		const result = await signInUseCase(params);
		if (result.isSignedIn) {

			const session = await lucia.createSession(result.userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
			const userSession = await lucia.validateSession(session.id);
			
			return Response({
				data: userSession
			});
		}

	} catch (error: any) {
		return ParsedError(error);
	}
};

export const logoutUserAction = ServerAction<any, any>(async () => {
	try {
		const { session } = await getUserSession();

		if (!session) throw new CustomThrowError("Unauthorized");

		await lucia.invalidateSession(session.id);

		const sessionCookie = lucia.createBlankSessionCookie();
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
	} catch (error) {
		return ParsedError(error);
	}

	redirect("/sign-in");
});