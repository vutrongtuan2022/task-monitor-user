import axiosClient from '.';
const contractsServices = {
	upsertContracts: (
		data: {
			uuid: string;
			activityUuid: string;
			code: string;
			contractorUuid: string;
			startDate: string;
			totalDayAdvantage: number;
			amount: number;
			contractExecutionAmount: number;
			advanceGuaranteeAmount: number;
			contractExecutionEndDate: string | null;
			advanceGuaranteeEndDate: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contracts/upsert-contracts`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContracts: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contracts/contract-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	getContractsReportFund: (
		data: {
			year: number;
			month: number;
			projectUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contracts/get-contracts-for-create-report-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	contractsReportFundpaged: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contracts/contract-detail-funds-paged`, data, {
			cancelToken: tokenAxios,
		});
	},
	listContractsForProject: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			projectUuid: string;
			contractorUuid: string;
			contractorCat: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contracts/get-page-list-contracts-for-project`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default contractsServices;
