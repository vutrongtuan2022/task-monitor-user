import axiosClient from '.';

const branchesServices = {
	categoryBranches: (
		data: {
			keyword: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Branches/category-branches`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertBranches: (
		data: {
			uuid: string;
			name: string;
			note: string;
			matp: string;
			maqh: string;
			xaid: string;
			address: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Branches/upsert-branches`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListBranches: (
		data: {
			pageSize: number;
			page: number;
			status: number;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Branches/get-page-list-branches`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatusBranches: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Branches/update-status-branches`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailBranches: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Branches/detail-branches`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default branchesServices;
