import axiosClient from '.';

const taskCatServices = {
	categoryTaskCat: (
		data: {
			keyword: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/category-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	insertTaskCat: (
		data: {
			name: string;
			workflow: {
				name: string;
				stage: number;
				children: any[];
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/insert-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailTaskCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/detail-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatusTaskCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/update-status-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	listTaskCat: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/get-page-list-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	importTaskExcel: (data: {name: any; FileData: any; Type: any}, tokenAxios?: any) => {
		return axiosClient.post(`/TaskCat/import_excel`, data, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'text/plain',
			},
		});
	},
	updateTaskCat: (
		data: {
			uuid: string;
			name: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/update-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default taskCatServices;
