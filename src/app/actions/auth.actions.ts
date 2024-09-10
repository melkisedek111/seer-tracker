"use server";

import { ParsedError, Response } from "@/lib/server-action.helper";
import { TSignInParams } from "@/types/auth.types";
import { signInUseCase } from "@/use-cases/auth.use-cases";
import { redirect } from "next/navigation";

export const signInAction = async (params: TSignInParams) => {
	let isSignedIn = false;

	try {
		const result = await signInUseCase(params);
        console.log(result)
		isSignedIn = result.isSignedIn;
	} catch (error: any) {
		return ParsedError(error);
	}

	if(isSignedIn) {
        redirect("/")
    }
};
