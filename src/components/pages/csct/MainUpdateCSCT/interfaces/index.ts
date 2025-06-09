import {IContractByProject} from '../../MainCreateCSCT/interfaces';

export interface PropsMainUpdateCSCT {}

export interface IFormUpdateCSCT {
	projectUuid: string;
	projectCode: string;
	code: string;
	numberingDate: string | Date;
	projectLeader: string;
	projectMember: string;
	listContract: IContractByProject[];
	totalAmount: string;
}

export interface IDetailCSCT {
	accumAmountInYear: number;
	status: number;
	totalAmount: number;
	accumAmount: number;
	percent: number;
	totalContracts: number;
	user: {
		fullname: string;
		code: string;
		uuid: string;
	};
	numberingDate: string;
	noticeDate: string;
	code: string;
	project: {
		code: string;
		name: string;
		created: string;
		state: number;
		leader: {
			uuid: string;
			fullname: string;
			code: string;
		};
		member: any[];
		branch: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
	};
	state: number;
	uuid: string;
}

export interface IListContractCSCT {
	pn: any;
	contract: {
		code: string;
		state: number;
		status: number;
		parent: null;
		contractorLinks: {
			contractor: {
				code: string;
				name: string;
				state: number;
				contractorLinkUuid: null;
				contractorCat: {
					id: number;
					code: string;
					name: string;
					isDefault: number;
					uuid: string;
				}[];
				amount: number;
				uuid: string;
			};
			contractorCat: {
				id: number;
				code: string;
				name: string;
				isDefault: number;
				uuid: string;
			};
			status: number;
			uuid: string;
		}[];
		startDate: string;
		uuid: string;
	};
	contractor: {
		contractor: {
			code: string;
			name: string;
			state: number;
			contractorLinkUuid: null;
			contractorCat: {
				id: number;
				code: string;
				name: string;
				isDefault: number;
				uuid: string;
			}[];

			amount: number;
			uuid: string;
		};
		contractorCat: {
			id: number;
			code: string;
			name: string;
			isDefault: number;
			uuid: string;
		};
		status: number;
		uuid: string;
	};
	amount: number;
	accumAmount: number;
	type: number;
	note: string;
	status: number;
	uuid: string;
}
