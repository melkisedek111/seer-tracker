"use server";
import { ROLES_OBJ } from "@/constants/index.types";
import { MESSAGES } from "@/constants/message.constants";
import ServerAction, {
	CustomThrowError,
	ParsedError,
	Response,
} from "@/lib/server-action.helper";
import { CreateServiceCategorySchema } from "@/schemas/service-category.schema";
import {
	TCreateServiceCategoryParams,
	TCreateServiceCategoryReturn,
	TGetServiceCategoriesReturn,
} from "@/types/serviceCategory.types";
import {
	createServiceCategoryUseCase,
	getServiceCategoriesUseCase,
} from "@/use-cases/service-category.use-cases";

export const createServiceCategoryAction = ServerAction<
	TCreateServiceCategoryReturn,
	TCreateServiceCategoryParams
>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN] },
	CreateServiceCategorySchema,
	async (params) => {
		try {
			const serviceCategoryCreated = await createServiceCategoryUseCase(params);
			return Response<TCreateServiceCategoryReturn>({
				data: serviceCategoryCreated,
				message: MESSAGES.SERVICE_CATEGORY_CREATE_SUCCESS,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);

export const getServiceCategoryAction = ServerAction<
	TGetServiceCategoriesReturn,
	any
>(
	{ authorized: [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN] },
	CreateServiceCategorySchema,
	async () => {
		try {
			const serviceCategoryCreated = await getServiceCategoriesUseCase();
			return Response<TGetServiceCategoriesReturn>({
				data: serviceCategoryCreated,
			});
		} catch (error) {
			return ParsedError(error);
		}
	}
);
