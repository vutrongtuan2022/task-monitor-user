export interface PropsMainInfoContractor {}

export interface IContractorProject {
	contractor: {
		code: string;
		name: string;
		contractorCat: {
			id: number;
			code: string;
			name: string;
			isDefault: number;
			uuid: string;
		}[];
		contractorLinkUuid: string;
		uuid: string;
	};
	totalContract: number;
	amount: number;
	status: number;
	uuid: string;
	note: string;
}
