export interface PropsTableContractFund {}

export interface IContractFund {
	uuid: string;
	releasedMonth: number;
	releasedYear: number;
	projectAmount: number;
	reverseAmount: number;
	totalAmount: number;
	creator: {
		uuid: string;
		fullname: string;
		code: string;
	};
	project: {
		uuid: string;
		code: string;
		name: string;
		created: string;
		state: 0;
		leader: {
			uuid: string;
			fullname: string;
			code: string;
		};
		member: [
			{
				uuid: string;
				fullname: string;
				code: string;
			}
		];
		branch: {
			uuid: string;
			code: string;
			name: string;
		};
	};
	created: string;
	state: number;
}
