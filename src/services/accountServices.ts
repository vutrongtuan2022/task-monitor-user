import {register} from 'module';
import axiosClient from '.';
import {TYPE_GENDER} from '~/constants/config/enum';
const accountServices = {
	sendOTP: (
		data: {
			email: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/send-otp`, data, {
			cancelToken: tokenAxios,
		});
	},
	enterOTP: (data: {email: string; otp: string}, tokenAxios?: any) => {
		return axiosClient.post(`/Account/enter-otp`, data, {
			cancelToken: tokenAxios,
		});
	},
	changePassForget: (data: {email: string; otp: string; newPass: string}, tokenAxios?: any) => {
		return axiosClient.post(`/Account/change-pass-forget`, data, {
			cancelToken: tokenAxios,
		});
	},
	register: (
		data: {
			username: string;
			password: string;
			userUuid: string;
			roleUuid: string;
			special: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/register`, data, {
			cancelToken: tokenAxios,
		});
	},
	listAccount: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number[];
			roleUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/get-page-list-account`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatus: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/lock_acc`, data, {
			cancelToken: tokenAxios,
		});
	},
	deleteAccount: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/update-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	updatetAccount: (
		data: {
			uuid: string;
			roleUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/update-account`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailAccount: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/detail-account`, data, {
			cancelToken: tokenAxios,
		});
	},
	getInfor: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/Account/detail-loginner`, data, {
			cancelToken: tokenAxios,
		});
	},
	changePassword: (data: {uuid: string; oldPassword: string; newPassword: string}, tokenAxios?: any) => {
		return axiosClient.post(`/Account/change-pass`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default accountServices;
