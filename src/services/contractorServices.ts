import axiosClient from '.';

const contractorServices = {
	listContractor: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			type: number | null;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	categoryContractor: (
		data: {
			keyword: string;
			status: number;
			type: string;
			uuid?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/category-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatusContractor: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/update-status-contractor`, data, {
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
	getContractorForProject: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			projectUuid: string;
			contractorUuid: string;
			contractorCat: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-contractor-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractor: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/detail-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertContractor: (
		data: {
			uuid: string;
			name: string;
			type: number | null;
			note: string;
			matp: string;
			maqh: string;
			xaid: string;
			address: string;
			code: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/upsert-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractorServices;
