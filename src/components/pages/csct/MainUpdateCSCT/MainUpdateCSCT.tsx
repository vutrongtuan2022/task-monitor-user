import Breadcrumb from '~/components/common/Breadcrumb';
import styles from './MainUpdateCSCT.module.scss';
import {IDetailCSCT, IFormUpdateCSCT, IListContractCSCT, PropsMainUpdateCSCT} from './interfaces';
import {memo, useEffect, useState} from 'react';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, TYPE_CONTRACT_PN} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import clsx from 'clsx';
import DatePicker from '~/components/common/DatePicker';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import contractsServices from '~/services/contractsServices';
import SelectManyGeneric from '~/components/common/SelectManyGeneric';
import pnServices from '~/services/pnServices';
import CSCTItemForm from '../CSCTItemForm';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import {IContractByProject} from '../MainCreateCSCT/interfaces';

function MainUpdateCSCT({}: PropsMainUpdateCSCT) {
	const router = useRouter();

	const {_uuidCSCT} = router.query;

	const {infoUser} = useSelector((state: RootState) => state.user);

	const initForm: IFormUpdateCSCT = {
		projectUuid: '',
		projectCode: '',
		code: '',
		numberingDate: new Date(),
		projectLeader: '',
		projectMember: infoUser?.fullname!,
		listContract: [],
		totalAmount: '0',
	};

	const [form, setForm] = useState<IFormUpdateCSCT>(initForm);

	useQuery<IDetailCSCT>([QUERY_KEY.detail_csct, _uuidCSCT], {
		queryFn: () =>
			httpRequest({
				http: pnServices.detailPN({
					uuid: _uuidCSCT as string,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				projectUuid: data?.project?.uuid || '',
				projectCode: data?.project?.code || '',
				code: data?.code || '',
				numberingDate: data?.numberingDate ? new Date(data?.numberingDate) : new Date(),
				projectLeader: data?.project?.leader?.fullname || '',
				projectMember: data?.user?.fullname || '',
			}));
		},
		enabled: !!_uuidCSCT,
	});

	useQuery<IListContractCSCT>([QUERY_KEY.detail_list_contract_csct, _uuidCSCT], {
		queryFn: () =>
			httpRequest({
				http: pnServices.getListPNContractByPN({
					uuid: _uuidCSCT as string,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				listContract: Array.isArray(data)
					? data.map((v) => ({
							...v,
							uuidContractProject: v?.uuid,
							amount: convertCoin(v?.amount),
							type: v?.type || TYPE_CONTRACT_PN.PAY,
							note: v?.note || '',
							contractorLinks: v?.contractor,
							startDate: v?.contract?.startDate,
							uuid: v?.contract?.uuid,
					  }))
					: [],
			}));
		},
		enabled: !!_uuidCSCT,
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

	const {data: listContract = []} = useQuery<IContractByProject[]>([QUERY_KEY.dropdown_contract, form?.projectUuid], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.getContractsByProject({
					projectUuid: form?.projectUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.projectUuid,
	});

	console.log('listContract', form?.listContract);

	useEffect(() => {
		const totalAmount = form?.listContract?.reduce((acc, curr) => acc + price(curr.amount), 0);

		setForm((prev) => ({
			...prev,
			totalAmount: convertCoin(totalAmount),
		}));
	}, [form?.listContract]);

	const funcCreatePN = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa CSCT thanh toán thành công!',
				http: pnServices.upsertPN({
					uuid: _uuidCSCT as string,
					projectUuid: form.projectUuid,
					code: form.code,
					numberingDate: moment(form?.numberingDate).format('YYYY-MM-DD'),
					totalAmount: price(form.totalAmount),
					contracts: form?.listContract?.map((v) => ({
						uuid: v?.uuidContractProject || '',
						contractUuid: v?.uuid,
						contractorLinkUuid: v?.contractorLinks?.uuid,
						amount: price(v.amount),
						type: v?.type,
						note: v?.note,
					})),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				router.back();
			}
		},
	});

	const handleSubmit = async () => {
		if (!form?.projectUuid) {
			return toastWarn({
				msg: 'Vui lòng chỉ chọn dự án!',
			});
		}
		if (!form?.code) {
			return toastWarn({
				msg: 'Không tìm thấy mã cấp số!',
			});
		}
		if (!form?.numberingDate) {
			return toastWarn({
				msg: 'Vui lòng chọn ngày lấy số!',
			});
		}
		if (form?.listContract?.length == 0) {
			return toastWarn({
				msg: 'Vui lòng chọn hợp động!',
			});
		}
		if (!form?.listContract.every((item) => price(item.amount) > 0)) {
			return toastWarn({
				msg: 'Giá trị thanh toán phải lớn hơn 0!',
			});
		}
		if (!form?.listContract.every((item) => item.note)) {
			return toastWarn({
				msg: 'Vui lòng nhập nội dung thanh toán!',
			});
		}

		return funcCreatePN.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreatePN.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.CSCT,
						title: 'Danh sách CSCT thanh toán',
					},
					{
						path: '',
						title: 'Chỉnh sửa CSCT thanh toán',
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
						<Button
							p_14_24
							rounded_8
							blueLinear
							// disable={!form.year || !form.month || !form.projectUuid}
							onClick={handleSubmit}
						>
							Lưu lại
						</Button>
					</div>
				}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
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
													projectCode: v?.code,
													projectLeader: v?.leader?.fullname,
													listContract: [],
												}));
											}}
										/>
									))}
								</Select>
								<div className={styles.col_2}>
									<Input
										type='text'
										name='projectCode'
										placeholder='Nhập mã dự án'
										label={
											<span>
												Mã dự án <span style={{color: 'red'}}>*</span>
											</span>
										}
										isRequired={true}
										readOnly={true}
									/>
									<div>
										<Input
											type='text'
											name='code'
											placeholder='Nhập mã cấp số'
											label={
												<span>
													Mã cấp số <span style={{color: 'red'}}>*</span>
												</span>
											}
											isRequired={true}
											readOnly={true}
										/>
									</div>
								</div>
							</div>
							<div className={clsx(styles.col_2, styles.mt)}>
								<DatePicker
									onClean={true}
									icon={true}
									label={
										<span>
											Ngày lấy số <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Chọn ngày lấy số'
									value={form?.numberingDate}
									onSetValue={(date) =>
										setForm((prev) => ({
											...prev,
											numberingDate: date,
										}))
									}
									name='numberingDate'
								/>
								<div className={styles.col_2}>
									<Input
										type='text'
										name='projectLeader'
										placeholder='Nhập lãnh đạo phụ trách'
										label={
											<span>
												Lãnh đạo phụ trách <span style={{color: 'red'}}>*</span>
											</span>
										}
										isRequired={true}
										readOnly={true}
									/>
									<div>
										<Input
											type='text'
											name='projectMember'
											placeholder='Nhập cán bộ phụ trách'
											label={
												<span>
													Cán bộ phụ trách <span style={{color: 'red'}}>*</span>
												</span>
											}
											isRequired={true}
											readOnly={true}
										/>
									</div>
								</div>
							</div>
							<div className={clsx(styles.col_2, styles.mt)}>
								<SelectManyGeneric
									text='hợp đồng'
									placeholder='Chọn hợp đồng'
									title='Danh sách hợp đồng'
									label={
										<span>
											Chọn số hợp đồng <span style={{color: 'red'}}>*</span>
										</span>
									}
									showSelectedItems={false}
									readOnly={!form.projectUuid}
									selectedItems={form?.listContract?.map((v) => v.uuid)}
									disabledItems={[]}
									options={listContract}
									getOptionLabel={(otp) => otp.code}
									getOptionValue={(otp) => otp.uuid}
									setSelectedItems={(list) => {
										const resolveUuids = (input: typeof list): (string | number)[] => {
											if (typeof input === 'function') {
												const prev = form.listContract.map((c) => c.uuid);
												return input(prev);
											}
											return input;
										};

										const uuids = resolveUuids(list);

										const selectedContracts = (listContract || [])
											.filter((contract) => uuids.includes(contract.uuid))
											.map((m) => {
												const existing = form?.listContract?.find((c) => c.uuid === m.uuid);

												return {
													...m,
													uuidContractProject: existing?.uuidContractProject || '',
													amount: existing?.amount || '0',
													type: existing?.type || TYPE_CONTRACT_PN.PAY,
													note: existing?.note || '',
												};
											});

										// ?.map((m) => ({
										// 	...m,
										// 	amount: '0',
										// 	type: TYPE_CONTRACT_PN.PAY,
										// 	note: '',
										// }));

										setForm((prev) => ({
											...prev,
											listContract: selectedContracts,
										}));
									}}
								/>
								<Input
									label={
										<span>
											Tổng số tiền thanh toán <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập tổng số tiền thanh toán'
									type='text'
									isMoney
									name='totalAmount'
									value={form?.totalAmount}
									isRequired={true}
									readOnly={true}
									blur={true}
									unit='VND'
								/>
							</div>
						</div>
					</div>
					{form?.listContract?.map((v, i) => (
						<CSCTItemForm key={i} index={i} form={form} setForm={setForm} contract={v} />
					))}
				</Form>
			</div>
		</div>
	);
}

export default memo(MainUpdateCSCT);
