export interface PropsTableReportWorkCurrent {}

export interface IReportWorkCurrent {
	activity: {
		name: string;
		state: number;
		uuid: string;
	};
	project: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	isInWorkFlow: boolean;
	month: number;
	year: number;
	issue: string;
	unfinishReason: string;
	progress: number;
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	megatype: string;
	deadlineState: number;
	dayDelayed: number;
	stage: number;
	digitalizedState: number;
}
