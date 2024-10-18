import axiosClient from '.';

const projectFundServices = {
	listProjectFund: (
		data: {
			pageSize: number;
			page: number;
			projectUuid: string;
			approved: number | null;
			status: number;
			year: number | null;
			month: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-page-list-project-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	listProjectFundAll: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			year: number | null;
			month: number | null;
			approved: number | null;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-page-list-project-fund-all`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailProjectFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-detail-project-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	createProjectFund: (
		data: {
			projectUuid: string;
			budget: number;
			year: number;
			month: number;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/create-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateProjectFund: (
		data: {
			uuid: string;
			budget: number;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/update-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	sendProjectFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/send-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	getProjectFundOverviewReport: (
		data: {
			projectUuid: string;
			month: number;
			year: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-project-fund-for-overview-report`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectFundServices;
