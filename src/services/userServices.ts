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
};

export default userServices;
