export interface PropsMainDetailTask {}

export interface IDetailTask {
	stages: {
		parentUuid: string | null;
		priority: string | null;
		order: number;
		status: number;
		type: number;
		stage: number;
		totalSubTask: number;
		totalSubSubTask: number;
		name: string;
		uuid: string;
	}[];
	updated: string | null;
	created: string;
	id: number;
	name: string;
	code: string | null;
	uuid: string;
}
