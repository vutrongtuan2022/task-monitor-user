export interface PropsCreateContractor {
	onClose: () => void;
}

export interface IFormCreateContractor {
	name: string;
	type: number | null;
	note: string;
	matp: string;
	maqh: string;
	xaid: string;
	address: string;
	code: string;
}
