export interface PropsCreatePayment {
	onClose: () => void;
}

export interface IFormCreatePayment {
	projectUuid: string;
	name: string;
	note: string;
	matp: string;
	maqh: string;
	xaid: string;
	address: string;
	code: string;
}
