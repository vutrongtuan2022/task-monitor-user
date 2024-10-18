import {createContext} from 'react';

export interface ICreateReportOverview {
	year: number | null;
	month: number | null;
	projectUuid: string;
}

export const CreateReportOverview = createContext<ICreateReportOverview>({
	year: null,
	month: null,
	projectUuid: '',
});
