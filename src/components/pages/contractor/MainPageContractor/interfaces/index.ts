export interface PropsMainPageContractor {}

export interface IContractor {
	contractorCat: {
		id: number;
		code: string;
		name: string;
		uuid: string;
	};
	updated: string;
	created: string;
	status: number;
	code: string;
	name: string;
	uuid: string;

	qh: any;
	tp: any;
	xa: any;
	address: string;
	note: string;
}
