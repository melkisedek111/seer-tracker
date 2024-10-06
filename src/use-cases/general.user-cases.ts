import { createDepartment, getDepartmentByParams, getDepartmentId, getDepartments, getDepartmentsBySelection, updateDepartment } from "@/data-access/department.data-access";
import { createPosition, getPositionById, getPositionByName, getPositions, getPositionsBySelection, updatePosition } from "@/data-access/position.data-access";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { PositionType } from "@/models/position.model";
import { TCreateDepartmentParams, TGetDepartmentByIdParams, TUpdateDepartmentParams } from "@/types/department.types";
import { TCreatePositionParams, TGetPositionByIdParams, TUpdatePositionParams } from "@/types/position.types";


export const getFilterPositionsAndDepartmentsUseCase = async () => {
    const positions = await getPositionsBySelection();
    const departments = await getDepartmentsBySelection();
    return { positions, departments };
}