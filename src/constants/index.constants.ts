import { StatusCodes } from "http-status-codes";

export const ROLES_OBJ = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    EMPLOYEE: "Employee",
};

export const ROLES = Object.values(ROLES_OBJ);

export const DESIGNATIONS = {
    UNIT_HEAD: "Unit Head",
    RECOMMENDING_APPROVER: "Recommending Approver",
    SERVICE_APPROVER: "Service Approver"
}

export const DESIGNATION_LIST = Object.values(DESIGNATIONS);

export const DESIGNATION_COLOR = {
    [DESIGNATIONS.UNIT_HEAD]: "text-yellow-600",
    [DESIGNATIONS.RECOMMENDING_APPROVER]: "text-red-600",
    [DESIGNATIONS.SERVICE_APPROVER]: "text-indigo-700"
}

export const DESIGNATION_BG_COLOR = {
    [DESIGNATIONS.UNIT_HEAD]: "bg-yellow-600",
    [DESIGNATIONS.RECOMMENDING_APPROVER]: "bg-red-600",
    [DESIGNATIONS.SERVICE_APPROVER]: "bg-indigo-700"
}

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

export const SERVICE_CATEGORIES = {
    MANAGEMENT_INFORMATION_SYSTEM: "Management Information System",
    BUILDING_AND_GROUNDS_SERVICES: "Building and Grounds Services"
}

export const PRIORITY_LEVEL = {
    HIGH: "high",
    NORMAL: "normal",
    LOW: "low"
}

export const NOTIFICATION_TYPE = {
    NEW_REQUEST: "New Request",
    REQUEST_UPDATE: "Request Update",
    NEW_MESSAGE: "New Message",
    TO_APPROVED_REQUEST: "To Approved Request"
}

export const REQUEST_PROCESS = {
    REQUEST_DETAILS: "Request Details",
    UNIT_APPROVAL: "Unit Approval",
    RECOMMENDING_APPROVAL: "Recommending Approval",
    SERVICE_APPROVAL: "Service Approval",
    ASSIGNED_APPROVAL: "Assigned Approval"
}