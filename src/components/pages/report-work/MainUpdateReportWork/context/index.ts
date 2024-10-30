import {createContext} from 'react';
import {IActivityUpdate} from '../interfaces';

export interface IUpdateReportWork {
	projectUuid: string;
	listActivity: IActivityUpdate[];
	setListActivity: (any: any) => void;
	year: number | null;
	month: number | null;
}

export const UpdateReportWork = createContext<IUpdateReportWork>({
	projectUuid: '',
	listActivity: [],
	setListActivity: () => null,
	year: null,
	month: null,
});
