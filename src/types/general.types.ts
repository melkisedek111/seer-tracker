import { DepartmentType } from "@/models/department.model";
import { PositionType } from "@/models/position.model"

export type  TGetFilterPositionsAndDepartmentsReturn = {
    positions: PositionType[];
    departments: DepartmentType[]
}