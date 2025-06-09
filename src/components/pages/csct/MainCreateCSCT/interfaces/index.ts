export interface PropsMainCreateCSCT {}

export interface IContractByProject {
	code: string;
	state: number;
	status: number;
	contractorLinks: {
		contractor: {
			code: string;
			name: string;
			state: number;
			contractorLinkUuid: string;
			amount: number;
			uuid: string;
		};
		contractorCat: {
			id: number;
			code: string;
			name: string;
			uuid: string;
		};
		status: number;
		uuid: string;
	};
	startDate: string;
	uuid: string;
	amount: string;
	type: number;
	note: string;
}

export interface IFormCreateCSCT {
	projectUuid: string;
	projectCode: string;
	code: string;
	numberingDate: string | Date;
	projectLeader: string;
	projectMember: string;
	listContract: IContractByProject[];
	totalAmount: string;
}
