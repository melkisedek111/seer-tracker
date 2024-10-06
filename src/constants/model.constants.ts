export const MODEL_NAMES = {
    USER: "user",
    DEPARTMENT: "department",
    POSITION: "position",
    SERVICE_CATEGORY: "serviceCategory",
    REQUEST_PROCESS: "requestProcess",
    REQUEST: "request",
    DESIGNATION: "designation"
} as const;


export const MODEL_FILEPATH_NAME = {
    [MODEL_NAMES.USER]: "user",
    [MODEL_NAMES.DESIGNATION]: "designation",
    [MODEL_NAMES.DEPARTMENT]: "department",
    [MODEL_NAMES.POSITION]: "position",
    [MODEL_NAMES.SERVICE_CATEGORY]: "service-category",
    [MODEL_NAMES.REQUEST_PROCESS]: "request-process",
    [MODEL_NAMES.REQUEST]: "request",
} as const


export const GetSchemaName = (model: string) => {
    return model + "s";
}