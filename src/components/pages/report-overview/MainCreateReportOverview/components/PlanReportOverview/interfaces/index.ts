export interface PropsPlanReportOverview {
	projectUuid: string;
	month: number;
	year: number;
}

export interface IPlanReportOverview {
	categoryTask: {
		name: string;
		uuid: string;
	};
	categoryProject: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	name: string;
	state: number;
	stage: number | null;
	status: number;
	megatype: string | null;
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	activityType: number;
	deadline: string;
	deadlineStage: number;
	digitalization: number;
	uuid: string;
	isWorkFlow: number;
}
