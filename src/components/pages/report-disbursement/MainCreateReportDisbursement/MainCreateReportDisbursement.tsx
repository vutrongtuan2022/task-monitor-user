import React, {useState} from 'react';

import {IFormCreateReportDisbursement, PropsMainCreateReportDisbursement} from './interfaces';
import styles from './MainCreateReportDisbursement.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form, {FormContext} from '~/components/common/Form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import TextArea from '~/components/common/Form/components/TextArea';
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
								reverseAmount: 0,
								amountDisbursement: 0,
								dayDisbursement: '',
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
					disbursementInfo: form?.contracts?.map((v) => {
						return {
							contractsUuid: v?.uuid,
							reverseAmount: price(v?.reverseAmount),
							amount: price(v?.amountDisbursement),
							disbursementDay: moment(v?.dayDisbursement).format('YYYY-MM-DD'),
						};
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
		if (form?.contracts?.some((v) => !v?.dayDisbursement)) {
			return toastWarn({msg: 'Vui lòng nhập đầy đủ thông tin giải ngân!'});
		}
		return funcCreateContractsReportFund.mutate();
	};

	const handleChangeValue = (index: number, name: string, value: any, isConvert?: boolean) => {
		const newData = [...form?.contracts];

		if (isConvert) {
			if (!Number(price(value))) {
				newData[index] = {
					...newData[index],
					[name]: 0,
				};
			}

			newData[index] = {
				...newData[index],
				[name]: convertCoin(Number(price(value))),
			};
		} else {
			newData[index] = {
				...newData[index],
				[name]: value,
			};
		}

		setForm((prev) => ({
			...prev,
			contracts: newData,
		}));
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
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
							<FormContext.Consumer>
								{({isDone}) => (
									<div className={styles.btn}>
										<Button
											p_14_24
											rounded_8
											blueLinear
											disable={!isDone || !form.year || !form.month || !form.projectUuid}
										>
											Thêm báo cáo
										</Button>
									</div>
								)}
							</FormContext.Consumer>
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

							<div className={styles.mt}>
								<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả' />
							</div>
						</div>
					</div>
					{form?.contracts?.map((v, i) => (
						<ContractItemCreate key={v?.uuid} index={i} contract={v} handleChangeValue={handleChangeValue} />
					))}
				</div>
			</div>
		</Form>
	);
}

export default MainCreateReportDisbursement;
