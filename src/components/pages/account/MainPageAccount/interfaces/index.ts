export interface PropsMainPageAccount {}

export interface IAccount {
	uuid: string;
	userName: string;
	role: {
		uuid: string;
		code: string;
		name: string;
	};
	user: {
		uuid: string;
		fullname: string;
		code: string;
		gender: number;
		email: string;
		phone: string;
		accountUU: {
			uuid: string;
			code: string;
			name: string;
		};
		isHaveAcc: number;
		address: string;
		status: number;
		birthday: string;
		qh: {
			uuid: string;
			code: string;
			name: string;
		};
		tp: {
			uuid: string;
			code: string;
			name: string;
		};
		xa: {
			uuid: string;
			code: string;
			name: string;
		};
		note: string;
		updated: string;
		created: string;
	};
	updated: string;
	status: number;
	created: string;
}
