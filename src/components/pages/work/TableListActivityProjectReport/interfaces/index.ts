export interface PropsTableListActivityProjectReport {
	onClose: () => void;
}

export interface IWorkDigitize {
	activityUuid: string;
	reportUuid: string;
	activityReportUuid: string;
	name: string;
	parent: {
		name: string;
		uuid: string;
	};
	stage: number;
	completeState: number;
	digitalizedState: number;
	megaType: string;
	isInWorkFlow: boolean;
	state: number;
}
