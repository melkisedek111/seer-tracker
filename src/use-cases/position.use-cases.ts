import { createPosition, getPositionById, getPositionByName, getPositions, updatePosition } from "@/data-access/position.data-access";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { PositionType } from "@/models/position.model";
import { TCreatePositionParams, TGetPositionByIdParams, TUpdatePositionParams } from "@/types/position.types";


export const createPositionUseCase = async (params: TCreatePositionParams): Promise<PositionType | null> => {
    const position = await getPositionByName(params.name);

    if(position) throw new CustomThrowError({ name: "Position name is already exists."});
    
    const positionCreated = await createPosition(params);

    if(!positionCreated) throw new CustomThrowError("Create position failed. please refresh the page.");

    return positionCreated;
}

export const getPositionsUseCase = async () => {
    return await getPositions();
}

export const getPositionByIdUseCase = async (params: TGetPositionByIdParams) =>  {
    const position = await getPositionById(params.positionId);
    if(!position) throw new CustomThrowError("Position does not exists");
    return position;
}

export const updatePositionUseCase = async (params: TUpdatePositionParams) => {
    const position = await getPositionById(params.positionId);
    if(!position) throw new CustomThrowError("Position does not exists");

    if(position.name !== params.name) {
        const positionByName = await getPositionByName(params.name);
        if(positionByName) throw new CustomThrowError("Position already exists.");
    }

    const updatedPosition = await updatePosition(params);

    if(!updatedPosition) throw new CustomThrowError("Update position failed. please refresh the page.");

    return updatedPosition;
}