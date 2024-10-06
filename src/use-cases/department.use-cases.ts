import { createDepartment, getDepartmentByParams, getDepartmentId, getDepartments, updateDepartment } from "@/data-access/department.data-access";
import { createPosition, getPositionById, getPositionByName, getPositions, updatePosition } from "@/data-access/position.data-access";
import { getUserByParams, getUserDesignationWithPositionByDepartment } from "@/data-access/user.data-access";
import { CustomThrowError } from "@/app/actions/server-action.helper";
import { DesignationType } from "@/models/designation.model";
import { PositionType } from "@/models/position.model";
import { TCreateDepartmentParams, TGetDepartmentByIdParams, TGetUsersWithDesignationByDepartmentIdParams, TUpdateDepartmentParams } from "@/types/department.types";
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


export const getUsersWithDesignationByDepartmentIdUseCase = async (params: TGetUsersWithDesignationByDepartmentIdParams) => {
    const department = await getDepartmentByParams({ _id: params.departmentId });

    if(!department) throw new CustomThrowError("Department does not exists");

    const userByDepartment = await getUserDesignationWithPositionByDepartment({ departmentId: params.departmentId });

    const users = userByDepartment.map((user: any) => {
        const position = user.position as PositionType;
        const designation = user?.designation as DesignationType;

        return {
            userId: user._id,
            name: user.fullName,
            position: position.name,
            designation: designation?.designation || null,
            designatedAt: designation?.designatedAt || null
        }
    })
    
    return users;
}