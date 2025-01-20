import axiosClient from '.';

const contractorcatServices = {
	getListContractorCat: (
		data: {
			pageSize: number;
			page: number;
			status: number;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/get-page-list-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatusContractorCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/update-status-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractorCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/detail-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	categoryContractorCat: (
		data: {
			keyword: string;
			status: number;
			isDefault?: number;
			uuid?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/category-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertContractorCat: (
		data: {
			uuid: string;
			name: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/upsert-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractorcatServices;
