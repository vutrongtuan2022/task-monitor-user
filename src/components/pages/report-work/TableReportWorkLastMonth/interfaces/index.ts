export interface PropsTableReportWorkLastMonth {
	projectUuid: string;
}

export interface IReportWorkLastMonth {
	activityUuid: string;
	name: string;
	megaType: string;
	isInWorkFlow: boolean;
	state: number;
	stage: number;
}
