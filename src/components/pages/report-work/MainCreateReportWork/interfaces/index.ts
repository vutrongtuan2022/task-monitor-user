export interface PropsMainCreateReportWork {}

export interface IActivityRegister {
	activityUuid: string;
	name: string;
	parent: {
		uuid: string;
		name: string;
	};
	stage: number;
	megaType: string;
	isInWorkFlow: boolean;
	state: number;
}
