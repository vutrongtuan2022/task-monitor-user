export interface PropsDisbursementReportOverview {
	projectUuid: string;
	month: number;
	year: number;
}

export interface IDisbursementReportOverview {
	projectDTO: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	year: number;
	month: number;
	totalContracts: number;
	totalFunds: number;
}
