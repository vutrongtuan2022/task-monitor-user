export interface PropsTableListWorkChecked {
	onClose: () => void;
}

export interface ITreeCreateReport {
	identify: string;
	activityUuid: string | null;
	name: string;
	state: number;
	registeredMonth: string | null;
	taskCount: {
		task: number;
		subTask: number;
		subSubTask: number;
	};
	children: ITreeCreateReport[];
}
