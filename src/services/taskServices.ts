import axiosClient from '.';

const taskServices = {
	listParentTask: (
		data: {
			uuid: string;
			type: number;
			stage: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Task/get-list-task`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default taskServices;
