import { StatusCodes } from "http-status-codes";

export const ROLES_OBJ = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    EMPLOYEE: "Employee",
    UNIT_HEAD: "Unit Head",
    RECOMMENDING_APPROVER: "Recommending Approver",
    SERVICE_APPROVER: "Service Approver"
};

export const ROLES = Object.values(ROLES_OBJ);


export const ERRORS_CODES = [
	StatusCodes.BAD_REQUEST,
	StatusCodes.FORBIDDEN,
	StatusCodes.UNAUTHORIZED,
	StatusCodes.UNPROCESSABLE_ENTITY
]

export const SUCCESS_CODES = [
	StatusCodes.OK,
	StatusCodes.CREATED
]

export const SERVICE_TYPES = {
    MIS: "Management Information System",
    BAGS: "Building and Grounds Services"
}

export const BAGS_SERVICES = {
    CARPENTRY_MASONRY: "Carpentry/Masonry",
    PLUMBING: "Plumbing",
    HAULING: "Hauling",
    GROUND_MAINTENANCE: "Ground Maintenance",
    MECHANICAL_WORKS: "Mechanical Works",
    PAINTING: "Painting",
    WELDING: "Welding",
}

export const MIS_SERVICES = {
    COMPUTER_PROBLEM: "Computer Problem",
    NETWORK_PROBLEM: "Network Problem"
}

export const SERVICES = [

]

export const ROLES_CHECKBOX = ROLES.map(role => ({
    id: role,
    label: role
}))