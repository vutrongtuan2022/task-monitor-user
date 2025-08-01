import React, {useEffect, useState} from 'react';
import styles from './MainUpdateReportDisbursement.module.scss';

import {IFormUpdateReportDisbursement, PropsMainUpdateReportDisbursement} from './interfaces';
import {useRouter} from 'next/router';
import {generateYearsArray} from '~/common/funcs/selectDate';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import Form from '~/components/common/Form';
import Loading from '~/components/common/Loading';
import {PATH} from '~/constants/config';
import Breadcrumb from '~/components/common/Breadcrumb';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import contractsFundServices from '~/services/contractFundServices';
import ContractItemUpdate from './ContractItemUpdate';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import {toastWarn} from '~/common/funcs/toast';

function MainUpdateReportDisbursement({}: PropsMainUpdateReportDisbursement) {
	const router = useRouter();
	const today = new Date();

	const {_uuid} = router.query;

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<IFormUpdateReportDisbursement>({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		projectUuid: '',
		description: '',
		contracts: [],
	});

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					excludeState: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	useQuery([QUERY_KEY.detail_contract_report_fund_for_update, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.getContractsFundForUpdate({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				const groupedMap = new Map<string, any>();

				data.contracts.forEach((v: any) => {
					const detailUuid = v?.detailContractsDTO?.uuid;
					if (!detailUuid) return;

					if (!groupedMap.has(detailUuid)) {
						groupedMap.set(detailUuid, {
							DetailContractsDTOUuid: detailUuid,
							detailContractsDTO: v.detailContractsDTO,
							pnContract: [],
						});
					}

					if (v?.pnContract) {
						const group = groupedMap.get(detailUuid);
						group.pnContract.push({
							...v.pnContract,
							note: v?.note,
							releaseDate: v?.releaseDate,
							contractsContractUuid: v?.contractsContractUuid,
							guaranteeAmount: convertCoin(v?.guaranteeAmount),
							guaranteeReverseAmount: convertCoin(v?.guaranteeReverseAmount),
						});
					}
				});

				const groupedContracts = Array.from(groupedMap.values());
				setForm((prev) => ({
					...prev,
					year: data.year,
					month: data.month,
					projectUuid: data.project?.uuid || '',
					description: data.note || '',
					contracts: groupedContracts,
				}));
			}
		},
		enabled: !!_uuid,
	});

	const handleChangeValue = (index: number, name: string, value: any, isConvert?: boolean, subIndex?: number) => {
		const newData = [...form?.contracts];
		if (!newData[index]?.pnContract || subIndex === undefined) return;

		const newPnContracts = [...newData[index].pnContract];

		let newValue: any = value;
		if (isConvert) {
			const numericValue = price(value);
			newValue = numericValue;
		}

		newPnContracts[subIndex] = {
			...newPnContracts[subIndex],
			[name]: newValue,
		};

		newData[index] = {
			...newData[index],
			pnContract: newPnContracts,
		};

		setForm((prev) => ({
			...prev,
			contracts: newData,
		}));
	};

	const handleDelete = (index: number) => {
		setForm((prev) => ({
			...prev,
			contracts: [...prev?.contracts?.slice(0, index), ...prev?.contracts?.slice(index + 1)],
		}));
	};

	const handleDeletePn = (index: number, idx: number) => {
		setForm((prev) => {
			const updateContracts = [...prev.contracts];
			const updateChildren = [
				...updateContracts[index].pnContract.slice(0, idx),
				...updateContracts[index].pnContract.slice(idx + 1),
			];
			updateContracts[index] = {
				...updateContracts[index],
				pnContract: updateChildren,
			};

			return {
				...prev,
				contracts: updateContracts,
			};
		});
	};

	const funcUpdateReportFund = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa báo cáo thành công!',
				http: contractsFundServices.updateReportFund({
					contractsFundUuid: _uuid as string,
					note: form?.description,
					disbursementInfo: form?.contracts?.flatMap((v) => {
						return v?.pnContract?.map((pn) => ({
							contractsUuid: v?.detailContractsDTO?.uuid,
							contractsContractUuid: pn?.contractsContractUuid,
							amount: price(pn?.guaranteeAmount),
							reverseAmount: price(pn?.guaranteeReverseAmount),
							disbursementDay: pn?.releaseDate ? moment(pn?.releaseDate).format('YYYY-MM-DD') : null,
							note: pn?.note,
							pnContractUuid: pn?.uuid,
						}));
					}),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
	});

	const handleSubmit = () => {
		if (form?.contracts?.length == 0) {
			return toastWarn({msg: 'Hiện tại chưa có hợp đồng nào!'});
		}

		return funcUpdateReportFund.mutate();
	};

	return (
		<Form form={form} setForm={setForm}>
			<div className={styles.container}>
				<Loading loading={funcUpdateReportFund.isLoading} />
				<Breadcrumb
					listUrls={[
						{
							path: PATH.ReportDisbursement,
							title: 'Báo cáo giải ngân',
						},
						{
							path: '',
							title: 'Chỉnh sửa báo cáo',
						},
					]}
					action={
						<div className={styles.group_btn}>
							<Button
								p_14_24
								rounded_8
								light-red
								onClick={(e) => {
									e.preventDefault();
									window.history.back();
								}}
							>
								Hủy bỏ
							</Button>

							<div className={styles.btn}>
								<Button
									p_14_24
									rounded_8
									blueLinear
									disable={!form.year || !form.month || !form.projectUuid}
									onClick={handleSubmit}
								>
									Cập nhật
								</Button>
							</div>
						</div>
					}
				/>

				<div className={styles.main}>
					<div className={styles.basic_info}>
						<div className={styles.head}>
							<h4>Thông tin cơ bản</h4>
						</div>
						<div className={styles.form}>
							<div className={styles.col_2}>
								<div className={styles.col_2}>
									<Select
										isSearch={true}
										readOnly={true}
										label={
											<span>
												Kế hoạch năm <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='year'
										value={form.year}
										placeholder='Chọn'
									>
										{years?.map((v: any) => (
											<Option
												key={v}
												value={v}
												title={`Năm ${v}`}
												onClick={() =>
													setForm((prev: any) => ({
														...prev,
														year: v,
													}))
												}
											/>
										))}
									</Select>
									<div>
										<Select
											isSearch={true}
											readOnly={true}
											label={
												<span>
													Kế hoạch tháng <span style={{color: 'red'}}>*</span>
												</span>
											}
											name='month'
											value={form.month}
											placeholder='Chọn'
										>
											{months?.map((v: any) => (
												<Option
													key={v}
													value={v}
													title={`Tháng ${v}`}
													onClick={() =>
														setForm((prev: any) => ({
															...prev,
															month: v,
														}))
													}
												/>
											))}
										</Select>
									</div>
								</div>
								<Select
									isSearch={true}
									readOnly={true}
									label={
										<span>
											Chọn dự án <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='projectUuid'
									value={form.projectUuid}
									placeholder='Chọn'
								>
									{listProject?.map((v: any) => (
										<Option
											key={v?.uuid}
											value={v?.uuid}
											title={v?.name}
											onClick={() => {
												setForm((prev: any) => ({
													...prev,
													projectUuid: v?.uuid,
												}));
											}}
										/>
									))}
								</Select>
							</div>
						</div>
					</div>
					{form?.contracts?.map((v, i) => (
						<ContractItemUpdate
							key={v?.contractsContractUuid}
							index={i}
							contract={v}
							handleChangeValue={handleChangeValue}
							handleDelete={() => handleDelete(i)}
							handleDeletePn={handleDeletePn}
						/>
					))}
				</div>
			</div>
		</Form>
	);
}

export default MainUpdateReportDisbursement;
