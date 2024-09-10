"use server";
import ServerAction, {
	ParsedError,
	Response,
} from "@/lib/server-action.helper";
import { TGetFilterPositionsAndDepartmentsReturn } from "@/types/general.types";
import { getFilterPositionsAndDepartmentsUseCase } from "@/use-cases/general.user-cases";

export const getFilterPositionsAndDepartmentsAction = ServerAction<
	TGetFilterPositionsAndDepartmentsReturn,
	undefined
>(async () => {
	try {
		const positionsAndDepartments =
			await getFilterPositionsAndDepartmentsUseCase();
		return Response<TGetFilterPositionsAndDepartmentsReturn>({
			data: positionsAndDepartments,
		});
	} catch (error) {
		return ParsedError(error);
	}
});
