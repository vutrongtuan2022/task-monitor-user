import {IUser} from '../../MainPageUser/interfaces';

export interface PropsFormCreateAccount {
	onClose: () => void;

	dataCreateAccount: IUser | null;
}
