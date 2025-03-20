export interface PropsMainPageWork {}

export interface IWork {
	report: {
		uuid: string;
		title: string;
		state: number;
		status: number;
		month: number;
		year: number;
		project: {
			uuid: string;
			code: string;
			name: string;
			state: number;
			leader: {
				fullname: string;
				code: string;
				uuid: string;
			};
		};
		reporter: {
			uuid: string;
			fullname: string;
			code: string;
		};
	};
	activity: {
		uuid: string;
		name: string;
		state: number;
		contracts: {
			uuid: string;
			code: string;
			status: number;
		};
	};

	type: number;
	isInWorkflow: boolean;
	issue: string;
	progress: number;
	deadlineState: number;
	dayDelayed: number;
	activityState: number;
	digitalizedState: number;
	activityStatus: number;
	unfinishReason: string;
	stage: number;
	uuid: string;
}
