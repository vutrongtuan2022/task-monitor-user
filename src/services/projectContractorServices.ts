import axiosClient from '.';

const projectContractorServices = {
	detailContractorProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/admin-get-for-modify-project-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	addContractorProject: (
		data: {
			projectUuid: string;
			contractorUuids: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/credel-project-contractors`, data, {
			cancelToken: tokenAxios,
		});
	},
	listContractorProject: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/get-paged-contractor-in-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	deleteContractorProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/remove-contractor-from-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	addContractorWithGuaranteeProject: (
		data: {
			projectUuid: string;
			contractorUuid: string;
			contractAmount: number;
			contractEndDate: string | null;
			projectGuaranteeAmount: number;
			projectGuaranteeEndDate: string | null;
			disbursementGuaranteeAmount: number;
			disbursementGuaranteeEndDate: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/add-contractor-with-guarantee-to-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailUpdateContractorProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/get-contractor-information-in-project`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateContractorWithGuaranteeProject: (
		data: {
			projectContractorUuid: string;
			contractorUuid: string;
			contractAmount: number;
			contractEndDate: string | null;
			projectGuaranteeAmount: number;
			projectGuaranteeEndDate: string | null;
			disbursementGuaranteeAmount: number;
			disbursementGuaranteeEndDate: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/update-contractor-information-in-project`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectContractorServices;
