import React, {useState} from 'react';

import {IFormUpdateReportDisbursement, PropsMainUpdateReportDisbursementHistory} from './interfaces';
import styles from './MainUpdateReportDisbursementHistory.module.scss';
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
import ContractItemUpdate from './ContractItemUpdate';
import contractsServices from '~/services/contractsServices';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import {toastWarn} from '~/common/funcs/toast';
import contractsFundServices from '~/services/contractFundServices';

function MainUpdateReportDisbursementHistory({}: PropsMainUpdateReportDisbursementHistory) {
	const router = useRouter();

	const {_uuid} = router.query;
	const years = generateYearsArray();

	const [form, setForm] = useState<IFormUpdateReportDisbursement>({
		year: null,
		projectUuid: '',
		disbursementInfo: [],
	});

	useQuery([QUERY_KEY.detail_contract_report_fund_history_for_update, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.getContractsFundForUpdate({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					year: data?.year,
					projectUuid: data?.project?.uuid || '',
					disbursementInfo: data?.contracts
						? data?.contracts?.map((v: any) => ({
								...v,
								guaranteeAmount: convertCoin(v?.guaranteeAmount),
								guaranteeReverseAmount: convertCoin(v?.guaranteeReverseAmount),
								note: v?.note,
						  }))
						: [],
				});
			}
		},
		enabled: !!_uuid,
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

	const funcUpdateContractsReportFundHistory = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm giải ngân quá khứ thành công!',
				http: contractsFundServices.updateContractFundReportFundHistory({
					contractsFundUuid: _uuid as string,
					disbursementInfo: form?.disbursementInfo?.map((v) => {
						return {
							contractsContractUuid: v?.contractsContractUuid,
							amount: price(v?.guaranteeAmount),
							reverseAmount: price(v?.guaranteeReverseAmount),
							disbursementDay: v?.releaseDate ? moment(v?.releaseDate).format('YYYY-MM-DD') : null,
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

		return funcUpdateContractsReportFundHistory.mutate();
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
				<Loading loading={funcUpdateContractsReportFundHistory.isLoading} />
				<Breadcrumb
					listUrls={[
						{
							path: PATH.ReportDisbursement,
							title: 'Báo cáo giải ngân',
						},
						{
							path: '',
							title: 'Chỉnh sửa giải ngân quá khứ',
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
									readOnly={true}
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
										label={<span>Kế hoạch năm</span>}
										name='year'
										value={form.year}
										placeholder='Chọn'
										readOnly={true}
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
						<ContractItemUpdate
							key={v?.contractsContractUuid}
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

export default MainUpdateReportDisbursementHistory;
