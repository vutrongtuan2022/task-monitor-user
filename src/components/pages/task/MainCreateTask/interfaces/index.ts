export interface PropsMainCreateTask {}

export interface ITaskCreate {
	level: number;
	name: string;
	stage: number;
	children: ITaskCreate[];
}
