import {IContractByProject, IFormCreateCSCT} from '../../MainCreateCSCT/interfaces';

export interface PropsCSCTItemForm {
	index: number;
	contract: IContractByProject;
	form: IFormCreateCSCT;
	setForm: (any: any) => void;
}
