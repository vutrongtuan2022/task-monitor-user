import {IActivityUpdate} from '../../../interfaces';

export interface PropsTableTreeWorkUpdate {
	onClose: () => void;
	listTree: IActivityUpdate[];
}
