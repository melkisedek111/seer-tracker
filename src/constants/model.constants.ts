export const MODEL_NAMES = {
    USER: "user",
    DEPARTMENT: "department",
    POSITION: "position",
    SERVICE_CATEGORY: "serviceCategory"
} as const;


export const MODEL_FILEPATH_NAME = {
    [MODEL_NAMES.USER]: "user",
    [MODEL_NAMES.DEPARTMENT]: "department",
    [MODEL_NAMES.POSITION]: "position",
    [MODEL_NAMES.SERVICE_CATEGORY]: "service-category",
} as const