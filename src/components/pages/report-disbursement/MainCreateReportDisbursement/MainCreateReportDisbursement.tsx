import React, {useState} from 'react';

import {IFormCreateReportDisbursement, PropsMainCreateReportDisbursement} from './interfaces';
import styles from './MainCreateReportDisbursement.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form from '~/components/common/Form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_PROJECT, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import ContractItemCreate from './ContractItemCreate';
import contractsServices from '~/services/contractsServices';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import {toastWarn} from '~/common/funcs/toast';
import contractsFundServices from '~/services/contractFundServices';

function MainCreateReportDisbursement({}: PropsMainCreateReportDisbursement) {
	const router = useRouter();
	const today = new Date();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<IFormCreateReportDisbursement>({
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
					excludeState: [STATE_PROJECT.FINISH, STATE_PROJECT.PREPARE],
				}),
			}),
		select(data) {
			return data;
		},
	});

	useQuery([QUERY_KEY.detail_contract_report_fund, form.year, form.month, form.projectUuid], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.getContractsReportFund({
					year: form.year!,
					month: form.month!,
					projectUuid: form.projectUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					contracts: data?.contracts
						? data?.contracts?.map((v: any) => ({
								...v,
								pnContract:
									v?.pnContract?.map((p: any) => ({
										...p,
										reverseAmount: 0,
										amountDisbursement: p?.type == 1 ? p?.remainingAmount : p?.advanceAmount ?? 0,
										dayDisbursement: p?.pn?.noticeDate ?? '',
										note: '',
										description: p?.note ?? '',
									})) || [],
						  }))
						: [],
				}));
			}
		},
		enabled: !!form.year && !!form.month && !!form.projectUuid,
	});

	const funcCreateContractsReportFund = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm báo cáo thành công!',
				http: contractsFundServices.createContractFundReportFund({
					year: form?.year,
					month: form?.month,
					projectUuid: form?.projectUuid,
					note: form?.description,
					disbursementInfo: form?.contracts?.flatMap((v) => {
						return v?.pnContract?.map((pn) => ({
							contractsUuid: v?.uuid,
							reverseAmount: price(pn?.reverseAmount),
							amount: price(pn?.amountDisbursement),
							disbursementDay: pn?.dayDisbursement ? moment(pn?.dayDisbursement).format('YYYY-MM-DD') : null,
							note: pn?.description || '',
							pnContractUuid: pn?.uuid || '',
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
		if (!form?.projectUuid) {
			return toastWarn({msg: 'Vui lòng chọn dự án!'});
		}
		if (form?.contracts?.length == 0) {
			return toastWarn({msg: 'Hiện tại chưa có hợp đồng nào!'});
		}
		// if (form?.contracts?.some((v) => !v?.dayDisbursement)) {
		// 	return toastWarn({msg: 'Vui lòng nhập đầy đủ thông tin giải ngân!'});
		// }

		return funcCreateContractsReportFund.mutate();
	};

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

	return (
		<Form form={form} setForm={setForm}>
			<div className={styles.container}>
				<Loading loading={funcCreateContractsReportFund.isLoading} />
				<Breadcrumb
					listUrls={[
						{
							path: PATH.ReportDisbursement,
							title: 'Báo cáo giải ngân',
						},
						{
							path: '',
							title: 'Thêm mới báo cáo',
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
									Thêm báo cáo
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
						<ContractItemCreate
							key={v?.uuid}
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

export default MainCreateReportDisbursement;
