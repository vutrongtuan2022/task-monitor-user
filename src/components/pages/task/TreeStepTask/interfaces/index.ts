export interface PropsTreeStepTask {
	index: number;
	level: number;
	type: number;
	task: {
		parentUuid: string | null;
		priority: string | null;
		order: number;
		status: number;
		type: number;
		stage: number;
		totalTask: number;
		totalSubTask: number;
		totalSubSubTask: number;
		name: string;
		uuid: string;
		stt: number;
	};
}
