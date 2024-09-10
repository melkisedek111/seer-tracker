import { getUserByEmailOrUsernameOrEmployeeNumber } from "@/data-access/user.data-access";
import { lucia } from "@/lib/lucia/auth";
import { CustomThrowError } from "@/lib/server-action.helper";
import { getUserSession } from "@/lib/session";
import { TSignInParams } from "@/types/auth.types";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const signInUseCase = async (params: TSignInParams) => {
	const user = await getUserByEmailOrUsernameOrEmployeeNumber(params.username);
    console.log(user)
	if (!user)
		throw new CustomThrowError("Username or password does not matched");

	const isPasswordValid = bcrypt.compareSync(params.password, user.password);
    console.log(isPasswordValid)
	if (!isPasswordValid)
		throw new CustomThrowError("Username or password does not matched");

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	
    return { isSignedIn: true };
};
