export interface PropsMainCreateReportDisbursement {}

export interface IContractsReportFund {
	advanceGuarantee: {
		amount: number;
		endDate: string;
		type: number;
		created: string;
		status: number;
		contUuid: string;
		uuid: string;
	};
	contractExecution: {
		amount: number;
		endDate: string;
		type: number;
		created: string;
		status: number;
		contUuid: string;
		uuid: string;
	};
	activityDTO: {
		name: string;
		state: number;
		contracts: {
			code: string;
			status: number;
			uuid: string;
		};
		uuid: string;
	};
	contractorDTO: {
		qh: {
			code: string;
			name: string;
			uuid: string;
		};
		tp: {
			code: string;
			name: string;
			uuid: string;
		};
		xa: {
			code: string;
			name: string;
			uuid: string;
		};
		address: string;
		note: string;
		status: number;
		code: string;
		name: string;
		contractorCat: {
			id: number;
			code: string;
			name: string;
			isDefault: number;
			uuid: string;
		}[];

		uuid: string;
	};
	creator: {
		fullname: string;
		code: string;
		uuid: string;
	};
	contractorInfos: {
		contractorName: string;
		contractorCatName: string;
		createDate: string;
	}[];
	totalContractor: number;
	totalContractorCat: number;
	totalDayAdvantage: number;
	amount: number;
	accumAmount: number;
	progress: number;
	startDate: string;
	endDate: string;
	updated: string;
	created: string;
	code: string;
	status: number;
	uuid: string;
	amountDisbursement: number;
	accumAmountThisYear: number;
	pnContract: {
		pn: {
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
				member: [];
				branch: {
					code: string;
					name: string;
					uuid: string;
				};
				uuid: string;
			};
			state: number;
			uuid: string;
		};
		contract: {
			code: string;
			state: number;
			status: number;
			parent: {
				code: string;
				state: number;
				status: number;
				uuid: string;
			};
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
			uuid: string;
		};
		contractor: {
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
		};
		amount: number;
		accumAmount: number;
		type: number;
		note: string;
		status: number;
		uuid: string;
		amountDisbursement: number;
		dayDisbursement: string;
		reverseAmount: number;
		description: string;
	}[];
	dayDisbursement: string;
	reverseAmount: number;
	note: string;
}

export interface IFormCreateReportDisbursement {
	year: number | null;
	month: number | null;
	projectUuid: string;
	description: string;
	contracts: IContractsReportFund[];
}
