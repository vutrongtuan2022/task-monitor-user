export interface PropsProjectReportOverview {
	projectUuid: string;
}

export interface IProjectReportOverview {
	name: string;
	code: string;
	description: string;
	state: number;
	progress: number;
	branch: {
		code: string;
		name: string;
		uuid: string;
	};
	taskCat: {
		id: number;
		name: string;
		code: string | null;
		uuid: string;
	};
	manager: {
		fullname: string;
		code: string;
		uuid: string;
	};
	user: {
		fullname: string;
		code: string;
		uuid: string;
	}[];
	digitalFile: string;
	expectBudget: number;
	totalInvest: number;
	realBudget: number;
	reserveBudget: number;
	remainReserveBudget: number;
	annualAccumAmount: number;
	accumAmount: number;
	annualBudget: number;
	address: string;
	tp: {
		code: string;
		name: string;
		uuid: string;
	};
	qh: {
		code: string;
		name: string;
		uuid: string;
	};
	xa: {
		code: string;
		name: string;
		uuid: string;
	};
	expectStart: string;
	expectEnd: string;
	realStart: string;
	realEnd: string;
	created: string;
	uuid: string;
}
