export interface IContractByAppendices {
	code: string;
	amount: number;
	startDate: string;
	endDate: string;
	totalDayAdvantage: number;
	totalContractor: number;
	totalContractorCat: number;
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
	parent: {
		code: string;
		state: number;
		status: number;
		uuid: string;
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
