import axiosClient from '.';

const userServices = {
	categoryUser: (
		data: {
			keyword: string;
			roleUuid: string;
			status: number;
			type: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/category-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailUser: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/detail-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertUser: (
		data: {
			uuid: string;
			fullName: string;
			email: string;
			gender: number;
			phone: string;
			birthday: string | null;
			address: string;
			matp: string;
			maqh: string;
			xaid: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/upsert-user`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;
