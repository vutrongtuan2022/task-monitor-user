import {IContractsReportFundHistory} from '../../interfaces';

export interface PropsContractItemCreate {
	index: number;
	handleChangeValue: (index: number, name: string, value: any, isConvert?: boolean) => void;
	contract: IContractsReportFundHistory;
	handleDelete: () => void;
}
