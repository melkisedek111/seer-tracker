import { MESSAGES } from "@/constants/message.constants";
import {
	createServiceCategory,
	getServiceCategories,
	getServiceCategoryByParams,
} from "@/data-access/service-category.data-access";
import { CustomThrowError } from "@/lib/server-action.helper";
import { TCreateServiceCategoryParams } from "@/types/serviceCategory.types";

export const createServiceCategoryUseCase = async (
	params: TCreateServiceCategoryParams
) => {
	let error: Record<string, string> = {};
	const getServiceCategoryByInitials = await getServiceCategoryByParams({
		initials: params.initials,
	});
	if (getServiceCategoryByInitials)
		error["initials"] = MESSAGES.SERVICE_CATEGORY_INITIALS_EXISTS;

	const getServiceCategoryByName = await getServiceCategoryByParams({
		name: params.name,
	});
	if (getServiceCategoryByName)
		error["name"] = MESSAGES.SERVICE_CATEGORY_INITIALS_EXISTS;

	if (Object.keys(error).length) throw new CustomThrowError(error);

	const serviceCategory = await createServiceCategory(params);

	if (!serviceCategory)
		throw new CustomThrowError(MESSAGES.SERVICE_CATEGORY_CREATE_FAILED);

	return { isServiceCategoryCreated: true };
};

export const getServiceCategoriesUseCase = async () => {
    return await getServiceCategories()
}
