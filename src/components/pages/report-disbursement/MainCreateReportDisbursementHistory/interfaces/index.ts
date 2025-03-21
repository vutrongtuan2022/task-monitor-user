export interface PropsMainCreateReportDisbursementHistory {}

export interface IContractsReportFundHistory {
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
		name: string;
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
		}[];
		uuid: string;
	};
	creator: {
		fullname: string;
		code: string;
		uuid: string;
	};
	contractorInfos: {
		contractorName: string;
		contractorCatName: string;
		createDate: string;
	}[];
	totalContractor: number;
	totalContractorCat: number;
	totalDayAdvantage: number;
	amount: number;
	accumAmount: number;
	progress: number;
	startDate: string;
	endDate: string;
	updated: string;
	created: string;
	code: string;
	status: number;
	uuid: string;
	amountDisbursement: number;
	accumAmountThisYear: number;
	dayDisbursement: string;
	reverseAmount: number;
	note: string;
}

export interface IFormCreateReportDisbursement {
	year: number | null;
	projectUuid: string;
	disbursementInfo: IContractsReportFundHistory[];
}
