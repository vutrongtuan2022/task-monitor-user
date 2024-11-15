import {IContractUpdateReportFund} from '../../interfaces';

export interface PropsContractItemUpdate {
	index: number;
	handleChangeValue: (index: number, name: string, value: any, isConvert?: boolean) => void;
	contract: IContractUpdateReportFund;
}
