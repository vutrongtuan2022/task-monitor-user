export interface PropsFormUpdateContractor {
	onClose: () => void;
}

export interface IFormUpdateContractor {
	type: string;
	contractorUuid: string;
	contractAmount: number | string;
	contractEndDate: string;
	projectGuaranteeAmount: number | string;
	projectGuaranteeEndDate: string;
	disbursementGuaranteeAmount: number | string;
	disbursementGuaranteeEndDate: string;
}
