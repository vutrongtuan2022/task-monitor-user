export interface PropsMainPageReportDisbursement {}

export interface IProjectFundAll {
	project: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	monthReport: string;
	realeaseBudget: number;
	totalInvest: number;
	annualBudget: number;
	annualAccumAmount: number;
	projectAccumAmount: number;
	fundProgress: number;
	created: string;
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	approved: number;
	status: number;
	uuid: string;
}
