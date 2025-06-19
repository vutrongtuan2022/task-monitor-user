export interface PropsTableContractFund {}

export interface IContractFund {
	activity: {
		name: string;
		state: number;
		project: {
			code: string;
			name: string;
			state: number;
			leader: {
				fullname: string;
				code: string;
				uuid: string;
			};
			uuid: string;
		};
		contracts: {
			code: string;
			state: number;
			status: number;
			uuid: string;
		};
		uuid: string;
	};
	contractorInfos: {
		contractorName: string;
		contractorCatName: string;
		createDate: string;
	}[];
	projectAmount: number;
	reverseAmount: number;
	releaseDate: string;
	contractor: {
		code: string;
		name: string;
		contractorCat: {
			id: number;
			code: string;
			name: string;
			isDefault: number;
			uuid: string;
		};
		uuid: string;
	};
	contractorGroup: {
		id: number;
		code: string;
		name: string;
		isDefault: number;
		uuid: string;
	};
	note: string;
	code: string;
	state: number;
	status: number;
	uuid: string;
	totalContractor: number;
	totalContractorCat: number;
	pnContract: {
		pn: {
			code: string;
			project: {
				code: string;
				name: string;
				created: string;
				state: 2;
				leader: {
					fullname: string;
					code: string;
					uuid: string;
				};
				member: [];
				branch: {
					uuid: string;
					code: string;
					name: string;
				};
				uuid: string;
			};
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
	parent: null;
	contractorLinks: {
		contractor: {
			code: string;
			name: string;
			state: number;
			contractorLinkUuid: string;
			contractorCat: {
				id: number;
				code: string;
				name: string;
				isDefault: number | null;
				uuid: string;
			}[];
			amount: number;
			uuid: string;
		};
		contractorCat: {
			id: number;
			code: string;
			name: string;
			isDefault: number | null;
			uuid: string;
		};
		status: number;
		uuid: string;
	}[];
	startDate: string;
}
