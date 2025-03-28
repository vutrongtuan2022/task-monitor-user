export interface PropsMainUpdateReportWork {}

export interface IActivityUpdate {
	identify: string;
	activityUuid: string;
	name: string;
	state: number;
	registeredMonth: string | null;
	parent: {
		name: string;
		uuid: string;
	} | null;
	taskCount: {
		task: number;
		subTask: number;
		subSubTask: number;
	};
	inheritContractFromParent: number;
	megaType: string;
	stage: number;
	isInWorkFlow: boolean;
	children: IActivityUpdate[];
}
