import axiosClient from '.';

const reportServices = {
	listReportUser: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			month: number | null;
			year: number | null;
			state: number | null;
			completeState: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-get-page-list-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	approveReportWork: (
		data: {
			uuid: string;
			note: string;
			isApprove: 0 | 1;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/approve-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	userDeleteReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-delete-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	userSendReport: (
		data: {
			reportUuid: string;
			activityDigitalState: {
				activityUuid: string;
				stateNote: number;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-send-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	userSendReportTwo: (
		data: {
			projectUuid: string;
			year: number;
			month: number;
			activityDigitalState: {
				activityUuid: string;
				stateNote: number;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-send-report-ver-2`, data, {
			cancelToken: tokenAxios,
		});
	},

	detailReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-get-report-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default reportServices;
