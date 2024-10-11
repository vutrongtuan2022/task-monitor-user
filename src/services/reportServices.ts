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
};

export default reportServices;
