import { RequestProcessType, TAssignedPerson, TConfirmation, TFilingUp, TRecommendingApproval, TServiceUnitApproval, TUnitApproval } from "@/models/request-process.model";
import { ServiceCategoryType } from "@/models/service-category.model";
import { UserType } from "@/models/user.model";

export type TCreateMISRequest = {
    serviceCategory: string;
    title: string;
    problemType: string;
    otherProblem?: string;
    problemDetails: any[];
    priorityLevel: string;
}

export type TCreateBAGSRequest = {
    serviceCategory: string;
    title: string;
    problemDetails: any[];
    priorityLevel: string;
    services: string[];
    otherService?: string | null;
}


export type TCreateRequestParams = {
    requestDetails: TCreateMISRequest | TCreateBAGSRequest,
    files: FormData;
}

export type TGetAllRequestParams = {
    page: number;
	limit: number;
	keywords: string;
	serviceType: string;
    serviceKeywordType: string;
    dateRange: any;
}

export type TRequestProcess = {
	_id: string;
	request: string;
	filingUp: TFilingUp;
	unitApproval: TUnitApproval;
	recommendingApproval: TRecommendingApproval;
	serviceUnitApproval: TServiceUnitApproval;
	confirmation: TConfirmation;
	assignedPerson: TAssignedPerson;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
};

export type TGetAllRequestReturn = {
    _id: string;
    title: string;
    userId: string;
    problemType: string;
    services: string[];
    otherProblem: string | null;
    otherService: string | null;
    startDate: Date | null;
    endDate: Date | null;
    requestorName: string;
    department: string;
    requestUniqueId: string;
    serviceCategory: string;
    problemDetails: any;
    requestProcess: TRequestProcess;
    createdAt: Date;
    avatar: string | null;
    priorityLevel: string;
}