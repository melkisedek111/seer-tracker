export type TServiceCategory = {
	_id: string;
	initials: string;
	name: string;
	isDeleted: boolean;
	isArchived: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type TCreateServiceCategoryParams = {
	initials: string;
	name: string;
};

export type TGetServiceCategoriesReturn = TServiceCategory[];

export type TCreateServiceCategoryReturn = {
	isServiceCategoryCreated: boolean;
};
