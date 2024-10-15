import {createContext} from 'react';
import {IActivityRegister} from '../MainCreateReportWork/interfaces';

export interface ICreateReportWork {
	projectUuid: string;
	listActivity: IActivityRegister[];
	setListActivity: (any: any) => void;
}

export const CreateReportWork = createContext<ICreateReportWork>({
	projectUuid: '',
	listActivity: [],
	setListActivity: () => null,
});
