import { createDepartment, getDepartmentByParams, getDepartmentId, getDepartments, updateDepartment } from "@/data-access/department.data-access";
import { createPosition, getPositionById, getPositionByName, getPositions, updatePosition } from "@/data-access/position.data-access";
import { CustomThrowError } from "@/lib/server-action.helper";
import { PositionType } from "@/models/position.model";
import { TCreateDepartmentParams, TGetDepartmentByIdParams, TUpdateDepartmentParams } from "@/types/department.types";
import { TCreatePositionParams, TGetPositionByIdParams, TUpdatePositionParams } from "@/types/position.types";


export const createDepartmentUseCase = async (params: TCreateDepartmentParams): Promise<PositionType | null> => {
    const departmentByName = await getDepartmentByParams({ name: params.name });

    if(departmentByName) throw new CustomThrowError({ name: "Department name is already exists."});
    
    const departmentByInitials = await getDepartmentByParams({ initials: params.initials });

    if(departmentByInitials) throw new CustomThrowError({ initials: "Department initials is already exists."});
    
    const departmentCreated = await createDepartment(params);

    if(!departmentCreated) throw new CustomThrowError("Create department failed. please refresh the page.");

    return departmentCreated;
}

export const getDepartmentsUseCase = async () => {
    return await getDepartments();
}

export const getDepartmentByIdUseCase = async (params: TGetDepartmentByIdParams) =>  {
    const department = await getDepartmentId(params.departmentId);
    if(!department) throw new CustomThrowError("Department does not exists");
    return department;
}

export const updateDepartmentUseCase = async (params: TUpdateDepartmentParams) => {
    const department = await getDepartmentId(params.departmentId);

    if(!department) throw new CustomThrowError("Department does not exists");

    if(department.name !== params.name) {
        const departmentByName = await getDepartmentByParams({ name: params.name });
        if(departmentByName) throw new CustomThrowError("Department name exists.");
    }

    if(department.initials !== params.initials) {
        const departmentByInitials = await getDepartmentByParams({ initials: params.initials });
        if(departmentByInitials) throw new CustomThrowError("Department initials exists.");
    }

    const updatedDepartment = await updateDepartment(params);

    if(!updatedDepartment) throw new CustomThrowError("Update department failed. please refresh the page.");

    return updatedDepartment;
}