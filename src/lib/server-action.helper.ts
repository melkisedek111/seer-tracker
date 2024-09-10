import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export type ResponseAction<T = any> = {
	status?: number;
	message?: string | string[];
	data: T;
	ok?: boolean;
	title?: string;
	isFormError?: boolean;
};

type TServerActionOptions = {
	authorized?: string[];
	redirectPath?: string;
	isLogout?: boolean;
};

export function Response<T>({
	data,
	message = "",
	status = 200,
	ok = true,
	isFormError = false,
}: {
	data: T;
	message?: string | string[];
	status?: number;
	ok?: boolean;
	isFormError?: boolean;
}): ResponseAction<T> {
	return { data: JSON.parse(JSON.stringify(data || {})), status, message, ok, isFormError };
}

function isObject(value: any) {
	if (Object.prototype.toString.call(value) === "[object Object]") {
		return true;
	}
	return false;
}

export class CustomThrowError extends Error {
	constructor(public message: any) {
		if (message) {
			if (typeof message === "string" || typeof message === "number") {
				message = message.toString();
			} else if (isObject(message)) {
				message = JSON.stringify({ ...message, isFormError: true });
			} else {
				message = JSON.stringify(message);
			}
		}
		super(message);
		this.name = "ThrowError"; // Set the error name for identification
	}
}

export const ParsedError = (error: any): ResponseAction<any> => {
	let response = {
		ok: false,
		status: StatusCodes.BAD_REQUEST,
		message: "Internal Server Error",
		data: undefined,
	};
	try {
		if (error?.message) {
			let hasErrorForm = false;
			let parsedError = JSON.parse(error.message);

			if (isObject(parsedError)) {
				const { isFormError, ...otherError } = parsedError;
                if(isFormError) {
                    hasErrorForm = isFormError;
                    parsedError = otherError
                }
			}

			return Response({
				ok: false,
				status: StatusCodes.BAD_REQUEST,
				message: parsedError,
				data: undefined,
				isFormError: hasErrorForm,
			});
		}
	} catch (err) {
		return Response({ ...response, message: error.message });
	}

	return Response(response);
};

function ServerAction<T, U>(
	callback: (params: U) => Promise<ResponseAction<T>>
): (params: U) => Promise<ResponseAction<T>>;
function ServerAction<T, U>(
	options: TServerActionOptions,
	callback: (params: U) => Promise<ResponseAction<T>>
): (params: U) => Promise<ResponseAction<T>>;
function ServerAction<T, U>(
	schema: z.ZodObject<any, any>,
	callback: (params: U) => Promise<ResponseAction<T>>
): (params: U) => Promise<ResponseAction<T>>;
function ServerAction<T, U>(
	options: TServerActionOptions,
	schema: z.ZodObject<any, any>,
	callback: (params: U) => Promise<ResponseAction<T>>
): (params: U) => Promise<ResponseAction<T>>;

function ServerAction<T, U>(
	arg1: any,
	arg3?: z.ZodObject<any, any> | any,
	arg2?: (params: U) => Promise<ResponseAction<T>>
): (params: U) => Promise<ResponseAction<T>> {
	let options: TServerActionOptions = {};
	let schema: z.ZodObject<any, any> | undefined;
	let callback: (params: U) => Promise<ResponseAction<T>>;

	if (
		typeof arg1 === "object" &&
		arg3 instanceof z.ZodObject &&
		typeof arg2 === "function"
	) {
		options = arg1;
		schema = arg3;
		callback = arg2;
	} else if (
		typeof arg1 === "object" &&
		!(arg1 instanceof z.ZodObject) &&
		typeof arg3 === "function"
	) {
		options = arg1;
		callback = arg3;
	} else if (arg1 instanceof z.ZodObject && typeof arg3 === "function") {
		schema = arg1;
		callback = arg3;
	} else if (typeof arg1 === "function") {
		callback = arg1;
	}

	if (typeof callback! !== "function") {
		throw new Error("Callback function must be present.");
	}
	
	return async (params: U) => {
		// if (options?.authorized) {
		// 	const { user, session } = await getUserSession();

		// 	let redirectPathByUser = await getUserRedirectPath(
		// 		user?.role,
		// 		options?.redirectPath
		// 	);
		// 	if (!user || !session) {
		// 		return redirect(redirectPathByUser);
		// 	}

		// 	if (!options?.authorized?.includes(user?.role!) && options?.isLogout) {
		// 		await lucia.invalidateSession(session?.id!);
		// 		const sessionCookie = lucia.createBlankSessionCookie();
		// 		cookies().set(
		// 			sessionCookie.name,
		// 			sessionCookie.value,
		// 			sessionCookie.attributes
		// 		);
		// 		return redirect(redirectPathByUser);
		// 	} else if (!options?.authorized?.includes(user?.role!)) {
		// 		return redirect(redirectPathByUser);
		// 	}
		// }

		if (schema && schema instanceof z.ZodObject && params !== undefined) {
			try {
				schema.parse(params);
			} catch (error) {
				if (error instanceof ZodError) {
					const errors: any = {};
					for(const errorMessage of error.errors) {
						const { path: [ path ], message } = errorMessage;
						errors[path] = message;
					}
					return Response<any>({
						ok: false,
						data: undefined,
						status: StatusCodes.UNPROCESSABLE_ENTITY,
						message: errors,
						isFormError: true,
					});
				} else {
					return Response<any>({
						data: undefined,
						status: StatusCodes.BAD_REQUEST,
						message: "Internal Server Error",
					});
				}
			}
		}

		return await callback(params);
	};
}

export default ServerAction;
