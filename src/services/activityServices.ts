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
	getActivityLastMonth: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			projectUuid: string;
			state: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-user-activity-last-month`, data, {
			cancelToken: tokenAxios,
		});
	},
	getActivityRegister: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			projectUuid: string;
			state: number | null;
			stage: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-project-activities-for-register`, data, {
			cancelToken: tokenAxios,
		});
	},
	registerActivitieWithMonth: (
		data: {
			projectUuid: string;
			reportTitle: string;
			reportNote: string;
			branchFeedback: string;
			year: number;
			month: number;
			listActivityForMonthlyRegister: {
				activityUuid: string;
				name: string;
				parent: {
					uuid: string;
					name: string;
				};
				stage: number;
				megaType: string;
				isInWorkFlow: boolean;
				state: number;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/register-activities-with-month`, data, {
			cancelToken: tokenAxios,
		});
	},
	getAllActivityReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-all-activity-in-report`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default activityServices;
