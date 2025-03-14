import axiosClient from '.';

const contractorServices = {
	listContractor: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			type: string;
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
			contractorCat: string;
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
			note: string;
			matp: string;
			maqh: string;
			xaid: string;
			address: string;
			code: string;
			lstType: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/upsert-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListUpdateContractorCat: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			contractorCat: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-update-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeUpdateContractorCat: (
		data: {
			uuid: string;
			state: number;
			rejected?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/change-state-update-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	sendUpdateContractorCat: (
		data: {
			uuid: string;
			contractorCatuuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/send-update-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractorForAdmin: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`Contractor/detail-contractor-for-admin`, data, {
			cancelToken: tokenAxios,
		});
	},
	listProjectForContractor: (
		data: {
			pageSize: number;
			page: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-project-for-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	listContractorCatByContractor: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`Contractor/get-list-contractor-cat-by-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	listUpdateContractorCatByContractor: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`Contractor/get-list-update-contractor-cat-by-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	sendRequestContractor: (
		data: {
			uuid: string;
			code: string;
			name: string;
			lstType: string[];
			note: string;
			matp: string;
			maqh: string;
			xaid: string;
			address: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/send-request-add-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListRequesterContractor: (
		data: {
			type: string;
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			state: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-requester-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractorServices;
