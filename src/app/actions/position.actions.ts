"use server";
import ServerAction, {
    CustomThrowError,
	ParsedError,
	Response,
} from "@/lib/server-action.helper";
import { PositionType } from "@/models/position.model";
import { CreatePositionSchema, GetPositionByIdSchema, UpdatePositionSchema } from "@/schemas/position.schemas";
import { TCreatePositionParams, TCreatePositionReturn, TGetPositionByIdParams, TUpdatePositionParams, TUpdatePositionReturn } from "@/types/position.types";
import { TCreateUserParams, TCreateUserReturn } from "@/types/user.types";
import { createPositionUseCase, getPositionByIdUseCase, getPositionsUseCase, updatePositionUseCase } from "@/use-cases/position.use-cases";


export const createPositionAction = ServerAction<TCreatePositionReturn, TCreatePositionParams>(CreatePositionSchema, async (params) => {
	try {
        const positionCreated = await createPositionUseCase(params);
		return Response<TCreatePositionReturn>({ data: { isPositionCreated: true }, message: "Position is created." });
	} catch (error) {
		return ParsedError(error);
	}
});

export const getPositionsAction = ServerAction<PositionType[], undefined>(async () => {
	try {
        const positionCreated = await getPositionsUseCase();
		return Response<PositionType[]>({ data: positionCreated });
	} catch (error) {
		return ParsedError(error);
	}
});

export const updatePositionAction = ServerAction<TUpdatePositionReturn, TUpdatePositionParams>(UpdatePositionSchema, async (params) => {
	try {
		const position = await updatePositionUseCase(params);
		return Response<TUpdatePositionReturn>({ data: { isPositionUpdated: true }, message: "Position is updated." });
	} catch (error) {
		return ParsedError(error);
	}
});

export const getPositionByIdAction = ServerAction<PositionType, TGetPositionByIdParams>(GetPositionByIdSchema, async (params) => {
	try {
        const position = await getPositionByIdUseCase(params);
		return Response<PositionType>({ data: position });
	} catch (error) {
		return ParsedError(error);
	}
});