export interface PropsUpdateContractor {
	onClose: () => void;
}
export interface IFormUpdateContractor {
	name: string;
	note: string;
	matp: string;
	maqh: string;
	xaid: string;
	address: string;
	code: string;
}
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
	code: string;
	name: string;
	contractorCat: {
		id: number;
		code: string;
		name: string;
		isDefault: number;
		uuid: string;
	}[];
	uuid: number;
}
