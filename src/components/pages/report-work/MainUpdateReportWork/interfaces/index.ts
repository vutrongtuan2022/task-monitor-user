export interface PropsMainUpdateReportWork {}

export interface IActivityRegister {
	activityUuid: string;
	name: string;
	parentTaskUuid: string;
	parent: {
		uuid: string;
		name: string;
	};
	stage: number;
	megaType: string;
	isInWorkFlow: boolean;
	state: number;
}
