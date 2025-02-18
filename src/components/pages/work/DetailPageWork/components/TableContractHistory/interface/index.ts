export interface IContractByActivity {
	code: string;
	amount: number;
	startDate: string;
	endDate: string;
	totalDayAdvantage: number;
	totalContractor: number;
	totalContractorCat: number;
	contractor: {
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
	contractorInfos: {
		contractorName: string;
		contractorCatName: string;
		createDate: string;
	}[];
	advanceGuarantee: {
		amount: number;
		endDate: string;
		type: number;
	};
	contractExecution: {
		amount: number;
		endDate: string;
		type: number;
	};
	user: {
		fullname: string;
		code: string;
		uuid: string;
	};
	activityName: string;
	state: number;
	status: number;
	uuid: string;
}
