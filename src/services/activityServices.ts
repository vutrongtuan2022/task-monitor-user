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
			deadLine: number | null;
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
	listActivityForActionNew: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			month: number | null;
			year: number | null;
			state: number | null;
			type: number | null;
			userUuid: string;
			projectUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-activities-for-action-new`, data, {
			cancelToken: tokenAxios,
		});
	},
	reportActivity: (
		data: {
			activityUuid: string;
			type: number;
			progress: number | null;
			issue: string;
			reportUuid: string;
			stateNote: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/report-activity`, data, {
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
				} | null;
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
	updateActivitieWithMonth: (
		data: {
			reportUuid: string;
			projectUuid: string;
			reportTitle: string;
			reportNote: string;
			branchFeedback: string;
			year: number;
			month: number;
			listActivityForModify: {
				activityUuid: string;
				name: string;
				parent: {
					uuid: string;
					name: string;
				} | null;
				stage: number;
				megaType: string;
				isInWorkFlow: boolean;
				state: number;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/modify-activities-in-report`, data, {
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
	getActivityReportForModify: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-all-activity-in-report-for-modify`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActivityLastMonthByProject: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-user-activity-last-month-by-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActivityLastMonth: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-user-activity-last-month`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActyvityInReport: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-activity-in-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListActivityLastMonth: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			projectUuid: string;
			month: number | null;
			year: number | null;
			reportUuid: string;
			type: 0 | 1;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-activity-last-month`, data, {
			cancelToken: tokenAxios,
		});
	},
	categoryTaskByProject: (
		data: {
			status: number;
			stage: number;
			projectUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/category-task-by-project-uuid`, data, {
			cancelToken: tokenAxios,
		});
	},
	treeActivitiesForRegister: (
		data: {
			projectUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-activities-tree-view-for-register`, data, {
			cancelToken: tokenAxios,
		});
	},
	getActivityTreeInReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-activity-tree-in-report`, data, {
			cancelToken: tokenAxios,
		});
	},

	getDetailActivityContract: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-detail-activity-and-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
	categoryActivityProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/category-activity-in-project`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default activityServices;
