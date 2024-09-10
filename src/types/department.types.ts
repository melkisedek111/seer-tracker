
export type TCreateDepartmentParams = {
    name: string;
    initials: string;
}

export type TCreateDepartmentReturn = {
    isDepartmentCreated: true
}

export type TGetDepartmentByIdParams = {
    departmentId: string;
}

export type TUpdateDepartmentParams = {
    departmentId: string;
    name: string;
    initials: string;
}

export type TUpdateDepartmentReturn = {
    isDepartmentUpdated: boolean;
}