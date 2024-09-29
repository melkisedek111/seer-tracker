"use server";
import { getUserByEmailOrUsernameOrEmployeeNumber } from "@/data-access/user.data-access";
import { lucia } from "@/lib/lucia/auth";
import { CustomThrowError } from "@/lib/server-action.helper";
import { getUserSession } from "@/app/lib/session";
import { TSignInParams } from "@/types/auth.types";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const signInUseCase = async (params: TSignInParams) => {
	const user = await getUserByEmailOrUsernameOrEmployeeNumber(params.username);

	if (!user)
		throw new CustomThrowError("Username or password does not matched");

	const isPasswordValid = bcrypt.compareSync(params.password, user.password);

	if (!isPasswordValid)
		throw new CustomThrowError("Username or password does not matched");

	if (!user?.isApproved)
		throw new CustomThrowError("Your account has not been approved.");
	if (!user?.role)
		throw new CustomThrowError(
			"Your account has not set. Please contact the admin."
		);
	if (!user?.isActive)
		throw new CustomThrowError(
			"Your account has been lock. Please contact the admin."
		);

	return { isSignedIn: true, userId: user._id };
};
