export interface PropsDetailReportDisbursement {}

export interface IDetailProjectFund {
	uuid: string;
	project: {
		uuid: string;
		code: string;
		name: string;
		state: number;
	};
	monthReport: string;
	year: number;
	month: number;
	realeaseBudget: number;
	totalInvest: number;
	annualBudget: number;
	annualAccumAmount: number;
	projectAccumAmount: number;
	fundProgress: number;
	created: string;
	reporter: {
		uuid: string;
		fullname: string;
		code: string;
	};
	approved: number;
	note: string;
	feedback: string;
	status: number;
}
