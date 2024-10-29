import {ITreeCreateReport} from '../../TableListWorkChecked/interfaces';

export interface PropsTreeReportWork {
	activity: ITreeCreateReport;
	level: number;
	index: number;
	isChecked: (nodeId: string) => boolean;
	toggleNode: (node: ITreeCreateReport, checked: boolean) => void;
}
