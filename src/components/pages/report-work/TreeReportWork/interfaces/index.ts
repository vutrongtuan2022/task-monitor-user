import {IActivityRegister} from '../../MainCreateReportWork/interfaces';

export interface PropsTreeReportWork {
	activity: IActivityRegister;
	level: number;
	index: number;
	isChecked: (nodeId: string) => boolean;
	toggleNode: (node: IActivityRegister, checked: boolean) => void;
}
