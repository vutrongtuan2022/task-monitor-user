import axiosClient from '.';

const activityServices = {
	listActivity: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			projectUuid: string;
			activityType: number | null;
			state: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-activity`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActivityForAction: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			month: number | null;
			year: number | null;
			state: number | null;
			type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-activities-for-action`, data, {
			cancelToken: tokenAxios,
		});
	},
	reportActivity: (
		data: {
			activityUuid: string;
			type: number;
			progress: number | null;
			issue: string;
			stateNote: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/report-activity`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default activityServices;
