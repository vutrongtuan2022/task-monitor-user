export interface PropsTableContractFund {
	releasedMonth: number;
	releasedYear: number;
	projectAmount: number;
	reverseAmount: number;
	amount: number;
	releasedDate: string;
	creator: {
		fullname: string;
		code: string;
		uuid: string;
	};
	created: string;
	state: number;
	note: string;
	pnContract: {
		pn: {
			code: string;
			state: number;
			uuid: string;
			numberingDate: string;
			noticeDate: string;
		};
		contractor: {
			contractor: {
				code: string;
				name: string;
				uuid: string;
				state: number;
				amount: number;
			};
			contractorCat: {
				uuid: string;
				code: string;
				name: string;
				isDefault: number;
				id: number;
			};
			status: number;
			uuid: string;
		};
		amount: number;
		accumAmount: number;
		type: number;
		note: string;
		uuid: string;
		status: number;
	};
}
