"use server";
import { ParsedError, Response } from "@/lib/server-action.helper";
import { TSignInParams } from "@/types/auth.types";
import { signInUseCase } from "@/use-cases/auth.use-cases";
import { getUserSession } from "../lib/session";
import { lucia } from "@/lib/lucia/auth";
import { cookies } from "next/headers";

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
