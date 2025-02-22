export interface PropsTableParticipating {}
export interface ITableParticipating {
	project: {
		code: string;
		name: string;
		state: number;
		leader: {
			uuid: string;
			fullname: string;
			code: string;
		};
		branch: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
	};
	created: string;
	status: number;
	uuid: string;
}
