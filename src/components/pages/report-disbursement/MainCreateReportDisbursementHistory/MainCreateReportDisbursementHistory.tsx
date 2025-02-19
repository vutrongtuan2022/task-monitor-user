import React, {useState} from 'react';

import {IFormCreateReportDisbursement, PropsMainCreateReportDisbursementHistory} from './interfaces';
import styles from './MainCreateReportDisbursementHistory.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form from '~/components/common/Form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
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

function MainCreateReportDisbursementHistory({}: PropsMainCreateReportDisbursementHistory) {
	const router = useRouter();

	const years = generateYearsArray();

	const [form, setForm] = useState<IFormCreateReportDisbursement>({
		year: null,
		projectUuid: '',
		disbursementInfo: [],
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

	useQuery([QUERY_KEY.detail_contract_report_fund_history, form.year, form.projectUuid], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.getContractsReportFundHistory({
					year: form.year,
					projectUuid: form.projectUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					disbursementInfo: data
						? data?.map((v: any) => ({
								...v,
								reverseAmount: 0,
								amountDisbursement: 0,
								dayDisbursement: '',
								contractsUuid: '',
								note: '',
						  }))
						: [],
				}));
			}
		},
		enabled: !!form.projectUuid,
	});

	const funcCreateContractsReportFundHistory = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm giải ngân quá khứ thành công!',
				http: contractsFundServices.createContractFundReportFundHistory({
					year: form?.year!,
					projectUuid: form?.projectUuid,
					disbursementInfo: form?.disbursementInfo?.map((v) => {
						return {
							contractsUuid: v?.uuid,
							reverseAmount: price(v?.reverseAmount),
							amount: price(v?.amountDisbursement),
							disbursementDay: v?.dayDisbursement ? moment(v?.dayDisbursement).format('YYYY-MM-DD') : null,
							note: v?.note,
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
		if (form?.disbursementInfo?.length == 0) {
			return toastWarn({msg: 'Hiện tại chưa có hợp đồng nào!'});
		}

		return funcCreateContractsReportFundHistory.mutate();
	};

	const handleChangeValue = (index: number, name: string, value: any, isConvert?: boolean) => {
		const newData = [...form?.disbursementInfo];

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
			disbursementInfo: newData,
		}));
	};

	const handleDelete = (index: number) => {
		setForm((prev) => ({
			...prev,
			disbursementInfo: [...prev?.disbursementInfo?.slice(0, index), ...prev?.disbursementInfo?.slice(index + 1)],
		}));
	};

	return (
		<Form form={form} setForm={setForm}>
			<div className={styles.container}>
				<Loading loading={funcCreateContractsReportFundHistory.isLoading} />
				<Breadcrumb
					listUrls={[
						{
							path: PATH.ReportDisbursement,
							title: 'Báo cáo giải ngân',
						},
						{
							path: '',
							title: 'Giải ngân quá khứ',
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
								<Button p_14_24 rounded_8 blueLinear disable={!form.projectUuid} onClick={handleSubmit}>
									Thêm giải ngân
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
								<div>
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
								</div>
							</div>
						</div>
					</div>

					{form?.disbursementInfo?.map((v, i) => (
						<ContractItemCreate
							key={v?.uuid}
							index={i}
							contract={v}
							handleChangeValue={handleChangeValue}
							handleDelete={() => handleDelete(i)}
						/>
					))}
				</div>
			</div>
		</Form>
	);
}

export default MainCreateReportDisbursementHistory;
