export interface PropsMainPageApprovalContractor {}

export interface ITablePageApproveRequester {
	uuid: string;
	requester: {
		fullname: string;
		code: string;
		uuid: string;
	};
	contractorCatPending: {
		id: number;
		code: string;
		name: string;
		isDefault: number;
		uuid: string;
	}[];
	code: string;
	name: string;
	status: number;
}
