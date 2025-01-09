import {ITaskCreate} from '../../MainCreateTask/interfaces';

export interface PropsTreeCreateTask {
	level: number;
	stage: number;
	index: number;
	task: ITaskCreate;
	workflow: ITaskCreate[];
	setWorkflow: (data: any) => void;
}
