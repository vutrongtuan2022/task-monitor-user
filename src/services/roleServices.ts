import axiosClient from '.';

const roleServices = {
	categoryRole: (
		data: {
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Role/category-role`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default roleServices;
