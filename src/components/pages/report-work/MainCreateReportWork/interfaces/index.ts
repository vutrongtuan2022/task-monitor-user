export interface PropsMainCreateReportWork {}

export interface IActivityRegister {
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
	megaType: string;
	stage: number;
	isInWorkFlow: boolean;
	children: IActivityRegister[];
}
