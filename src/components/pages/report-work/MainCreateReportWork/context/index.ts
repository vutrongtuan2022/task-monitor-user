import {createContext} from 'react';
import {IActivityRegister} from '../interfaces';

export interface ICreateReportWork {
	projectUuid: string;
	listActivity: IActivityRegister[];
	setListActivity: (any: any) => void;
	year: number | null;
	month: number | null;
}

export const CreateReportWork = createContext<ICreateReportWork>({
	projectUuid: '',
	listActivity: [],
	setListActivity: () => null,
	year: null,
	month: null,
});
