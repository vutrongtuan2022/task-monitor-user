import axiosClient from '.';

const contractorServices = {
	categoryContractor: (
		data: {
			keyword: string;
			status: number;
			type: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/category-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},

	categoryContractorInProject: (
		data: {
			keyword: string;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/category-contractor-in-project`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractorServices;
