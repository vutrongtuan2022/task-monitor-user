export interface PropsMainPagePaymentApproval {}

export interface IPayment {
	contractorCat: {
		id: number;
		code: string;
		name: string;
		uuid: string;
	}[];
	contractorCatPending: {
		id: number;
		code: string;
		name: string;
		uuid: string;
	}[];
	updated: string;
	created: string;
	status: number;
	code: string;
	name: string;
	uuid: string;
	state: number;
	qh: any;
	tp: any;
	xa: any;
	address: string;
	note: string;
}
