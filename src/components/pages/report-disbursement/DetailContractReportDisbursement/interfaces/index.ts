export interface PropsDetailContractReportDisbursement {}

export interface IDetailContract {
	advanceGuarantee: {
		amount: number;
		endDate: string;
		type: number;
		created: string;
		status: number;
		contUuid: string;
		uuid: string;
	};
	contractExecution: {
		amount: number;
		endDate: string;
		type: number;
		created: string;
		status: number;
		contUuid: string;
		uuid: string;
	};
	activityDTO: {
		name: number;
		state: number;
		contracts: {
			code: string;
			status: number;
			uuid: string;
		};
		uuid: string;
	};
	contractorDTO: {
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
		};
		uuid: string;
	};
	creator: {
		fullname: string;
		code: string;
		uuid: string;
	};
	projectDTO: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	totalDayAdvantage: number;
	amount: number;
	accumAmount: number;
	progress: number;
	startDate: string;
	endDate: string;
	updated: null;
	created: string;
	code: string;
	status: number;
	uuid: string;
}

export interface IContractDetailFund {
	releasedMonth: 1;
	releasedYear: 2025;
	amount: 1200000000;
	releasedDate: '2025-01-13T00:00:00';
	creator: {
		fullname: 'linhtrang';
		code: 'U45';
		uuid: '2146100a-87ab-11ef-9e1b-0242ac12005a';
	};
	created: '2024-11-14T02:54:57';
	state: 0;
}
