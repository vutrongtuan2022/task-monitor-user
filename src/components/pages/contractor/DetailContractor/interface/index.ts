export interface PropsDetailContractor {}
export interface IDetailContractor {
	updated: string;
	created: string;
	qh: {
		code: string;
		name: string;
		uuid: string;
	};
	tp: {
		code: string;
		name: string;
		uuid: string;
	};
	xa: {
		code: string;
		name: string;
		uuid: string;
	};
	address: string;
	note: string;
	status: number;
	contractorCatPending: any[];
	code: string;
	name: string;
	contractorLinkUuid: string;
	contractorCat: {
		id: number;
		code: string;
		name: string;
		isDefault: number;
		uuid: string;
	}[];
	amount: number;
	uuid: string;
}
