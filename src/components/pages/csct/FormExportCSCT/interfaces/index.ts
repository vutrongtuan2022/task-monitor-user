export interface PropsFormExportCSCT {
	onClose: () => void;
}

export interface IPNForExport {
	contracts: {
		code: string;
		state: number;
		status: number;
		contractorLinks: {
			contractor: {
				code: string;
				name: string;
				state: number;
				contractorCat: {
					id: number;
					code: string;
					name: string;
					uuid: string;
				}[];
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
		}[];
		startDate: string;
		created: string;
		uuid: string;
	}[];
	pnContracts: {
		pn: {
			code: string;
			project: {
				code: string;
				name: string;
				created: string;
				state: number;
				leader: {
					fullname: string;
					code: string;
					uuid: string;
				};
				member: {
					fullname: string;
					code: string;
					uuid: string;
				}[];
				uuid: string;
			};
			state: number;
			numberingDate: string;
			noticeDate: string;
			totalAmount: number;
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
				contractorLinks: {
					contractor: {
						code: string;
						name: string;
						state: number;
						contractorCat: {
							id: number;
							code: string;
							name: string;
							uuid: string;
						}[];
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
				}[];
				startDate: string;
				created: string;
				uuid: string;
			};
			contractorLinks: {
				contractor: {
					code: string;
					name: string;
					state: number;
					contractorCat: {
						id: number;
						code: string;
						name: string;
						uuid: string;
					}[];
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
			}[];
			startDate: string;
			created: string;
			uuid: string;
		};
		contractor: {
			contractor: {
				code: string;
				name: string;
				state: number;
				contractorCat: {
					id: number;
					code: string;
					name: string;
					uuid: string;
				}[];
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
		amount: number;
		accumAmount: number;
		remainingAmount: number;
		advanceAmount: number;
		type: number;
		note: string;
		status: number;
		uuid: string;
	}[];
	totalReverseAmount: number;
	totalRemainingAmount: number;
	totalAdvanceAmount: number;
	totalPaymenAmount: number;
	code: string;
	codeDOC: string;
	codeDOCNumber: string;
	project: {
		code: string;
		name: string;
		created: string;
		state: number;
		leader: {
			fullname: string;
			code: string;
			uuid: string;
		};
		member: {
			fullname: string;
			code: string;
			uuid: string;
		}[];
		branch: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
	};
	state: number;
	numberingDate: string;
	noticeDate: string;
	totalAmount: number;
	uuid: string;
	totalRemainingAmountOut: number;
}
