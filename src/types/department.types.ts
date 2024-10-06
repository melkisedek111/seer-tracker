export type TDepartment = {
    _id: string;
    name: string;
    isDeleted: string;
    isActive: string;
    isArchived: string;
}

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

export type TGetUsersWithDesignationByDepartmentIdParams = {
    departmentId: string;
}

export type TGetUsersWithDesignationByDepartmentIdReturn = {
    userId: string;
    name: string;
    position: string;
    designation: string | null;
    designatedAt: Date | null;
}