export interface PropsMainPageReportDisbursement {}

export interface IReportDisbursement {
	// project: {
	// 	code: string;
	// 	name: string;
	// 	state: number;
	// 	uuid: string;
	// };
	// creator: {
	// 	fullname: string;
	// 	code: string;
	// 	uuid: string;
	// };
	// releasedMonth: number;
	// releasedYear: number;
	// contractCount: number;
	// totalAmount: number;
	// sendDate: string;
	// state: number;
	// note: string;
	// rejectedReason: string;
	// uuid: string;

	uuid: string;
	project: {
		uuid: string;
		code: string;
		name: string;
		state: number;
	};
	creator: {
		uuid: string;
		fullname: string;
		code: string;
	};
	releasedMonth: number;
	releasedYear: number;
	totalAmount: number;
	sendDate: string | null;
	state: number;
	yearlyBudget: number | null;
	totalBudget: number;
}
