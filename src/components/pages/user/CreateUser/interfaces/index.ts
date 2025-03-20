export interface PropsCreateUser {
	onClose: () => void;
}

export interface ICreateUser {
	uuid: string;
	fullName: string;
	email: string;
	gender: number;
	phone: string;
	birthday: Date | null;
	address: string;
	matp: string;
	maqh: string;
	xaid: string;
	note: string;
}
