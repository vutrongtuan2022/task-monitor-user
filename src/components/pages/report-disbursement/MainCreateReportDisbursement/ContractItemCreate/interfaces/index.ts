import {IContractsReportFund} from '../../interfaces';

export interface PropsContractItemCreate {
	index: number;
	handleChangeValue: (index: number, name: string, value: any, isConvert?: boolean, subIndex?: number) => void;
	contract: IContractsReportFund;
	handleDelete: () => void;
	handleDeletePn: (index: number, idx: number) => void;
}
