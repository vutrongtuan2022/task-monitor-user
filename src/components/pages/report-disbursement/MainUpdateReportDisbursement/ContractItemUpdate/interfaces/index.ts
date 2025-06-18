import {IContractUpdateReportFund} from '../../interfaces';

export interface PropsContractItemUpdate {
	index: number;
	handleChangeValue: (index: number, name: string, value: any, isConvert?: boolean, subIndex?: number) => void;
	contract: IContractUpdateReportFund;
	handleDelete: () => void;
	handleDeletePn: (index: number, idx: number) => void;
}
