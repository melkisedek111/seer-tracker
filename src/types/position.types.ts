
export type TCreatePositionParams = {
    name: string;
}

export type TUpdatePositionParams = {
    positionId: string;
    name: string;
}

export type TUpdatePositionReturn = {
    isPositionUpdated: boolean
}
export type TCreatePositionReturn = {
    isPositionCreated: boolean
}

export type TGetPositionByIdParams = {
    positionId: string;
}
