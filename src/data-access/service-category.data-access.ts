import ServiceCategory, { ServiceCategoryType } from "@/models/service-category.model"
import { TCreateServiceCategoryParams, TServiceCategory } from "@/types/serviceCategory.types"

export const createServiceCategory = async (params: TCreateServiceCategoryParams): Promise<ServiceCategoryType> => {
    return await ServiceCategory.create(params);
}

export const getServiceCategories = async (): Promise<ServiceCategoryType[]> => {
    return await ServiceCategory.find({});
}

export const getServiceCategoryByParams = async (params: Partial<TServiceCategory>): Promise<ServiceCategoryType | null> => {
    return await ServiceCategory.findOne(params);
}