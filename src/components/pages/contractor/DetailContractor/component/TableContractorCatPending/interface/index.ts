export interface PropsTableContractorCatPending {}
export interface ITableContractorCatPending {
	contractor: {
		code: string;
		name: string;
		uuid: string;
	};
	contractorCat: {
		id: number;
		code: string;
		name: string;
		isDefault: number;
		uuid: string;
	};
	user: {
		fullname: string;
		code: string;
		uuid: string;
	};
	timeCreated: string;
	status: number;
	uuid: string;
}
