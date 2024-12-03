import axiosClient from '.';
const contractsFundServices = {
	getUserContractFundPaged: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			month: number | null;
			year: number | null;
			state: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-user-contract-funds-paged`, data, {
			cancelToken: tokenAxios,
		});
	},
	createContractFundReportFund: (
		data: {
			year: number | null;
			month: number | null;
			projectUuid: string;
			note: string;
			disbursementInfo: {
				contractsUuid: string;
				amount: number;
				reverseAmount: number;
				disbursementDay: string | null;
				note: string;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/create-report-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/contractfund-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractFundFundPaged: (
		data: {
			pageSize: number;
			page: number;
			keyword: string | null;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/contractfund-detail-contracts-paged`, data, {
			cancelToken: tokenAxios,
		});
	},
	getContractsFundForUpdate: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-contractsFund-for-update`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateReportFund: (
		data: {
			contractsFundUuid: string;
			note: string;
			disbursementInfo: {
				contractsContractUuid: string;
				amount: number;
				reverseAmount: number;
				disbursementDay: string | null;
				note: string | null;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/update-report-fund`, data, {
			cancelToken: tokenAxios,
		});
	},

	sendContractFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/user-send-contract-fund`, data, {
			cancelToken: tokenAxios,
		});
	},

	getContractFundForOverView: (
		data: {
			projectUuid: string;
			month: number;
			year: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-contract-fun-for-over-view`, data, {
			cancelToken: tokenAxios,
		});
	},
	listContractFundForOverView: (
		data: {
			pageSize: number;
			page: number;
			projectUuid: string;
			year: number | null;
			month: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-list-contract-contract-fund-for-over-view`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatus: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/update-status`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default contractsFundServices;
