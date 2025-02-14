import React, {useState} from 'react';

import {PropsFormAppendicesContract} from './interfaces';
import styles from './FormAppendicesContract.module.scss';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import clsx from 'clsx';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import contractorServices from '~/services/contractorServices';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import Select, {Option} from '~/components/common/Select';
import contractorcatServices from '~/services/contractorcatServices';
import DatePicker from '~/components/common/DatePicker';
import {toastWarn} from '~/common/funcs/toast';
import contractsServices from '~/services/contractsServices';
import moment from 'moment';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import Loading from '~/components/common/Loading';
import GridColumn from '~/components/layouts/GridColumn';

interface IFormAppendicesContract {
	codeParentContract: string;
	nameActivity: string;
	code: string;
	// contractorUuid: string;
	// contractorGroupUuid: string;
	contractorAndCat: {
		contractorUuid: string;
		contractorCatUuid: string;
	}[];
	startDate: string;
	totalDayAdvantage: number | null;
	amount: number | string;
	contractExecutionAmount: number | string;
	contractExecutionEndDate: string;
	advanceGuaranteeAmount: number | string;
	advanceGuaranteeEndDate: string;
	contractParentUuid: string;
}

function FormAppendicesContract({onClose, nameActivity}: PropsFormAppendicesContract) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_appendicesUuid} = router.query;

	const [form, setForm] = useState<IFormAppendicesContract>({
		codeParentContract: '',
		nameActivity: nameActivity,
		code: '',
		contractorAndCat: [
			{
				contractorUuid: '',
				contractorCatUuid: '',
			},
		],
		startDate: '',
		totalDayAdvantage: null,
		amount: 0,
		contractExecutionAmount: 0,
		contractExecutionEndDate: '',
		advanceGuaranteeAmount: 0,
		advanceGuaranteeEndDate: '',
		contractParentUuid: '',
	});

	useQuery([QUERY_KEY.detail_contract_addium], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.detailContractsAddium({
					uuid: _appendicesUuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					codeParentContract: data?.parentContract?.code || '',
					nameActivity: data?.activity?.name || '',
					code: '',
					// contractorUuid: data?.contractor?.name || '',
					// contractorGroupUuid: data?.contractor?.contractorCat?.map((v: any) => v?.name) || '',
					contractorAndCat:
						data?.contractor?.length == 0
							? [
									{
										contractorUuid: '',
										contractorCatUuid: '',
									},
							  ]
							: data?.contractor?.map((v: any) => ({
									contractorUuid: v?.uuid || '',
									contractorCatUuid: v?.contractorCat?.[0]?.uuid || '',
							  })),
					startDate: '',
					totalDayAdvantage: null,
					amount: convertCoin(data?.amount),
					contractExecutionAmount: convertCoin(data?.contractExecution?.amount),
					contractExecutionEndDate: '',
					advanceGuaranteeAmount: convertCoin(data?.advanceGuarantee?.amount),
					advanceGuaranteeEndDate: '',
					contractParentUuid: data?.parentContract?.uuid || '',
				});
			}
		},
		enabled: !!_appendicesUuid,
	});

	const funcCreateContractAdditional = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới phụ lục hợp đồng thành công!',
				http: contractsServices.insertAddendum({
					uuid: '',
					activityUuid: '',
					code: form?.code,
					contractorAndCat: form?.contractorAndCat?.map((v) => ({
						contractorUuid: v?.contractorUuid,
						contractorCatUuid: v?.contractorCatUuid,
					})),
					startDate: moment(form?.startDate).format('YYYY-MM-DD'),
					totalDayAdvantage: form?.totalDayAdvantage!,
					amount: price(form?.amount),
					contractExecutionAmount: price(form?.contractExecutionAmount),
					contractExecutionEndDate: form?.contractExecutionEndDate
						? moment(form?.contractExecutionEndDate).format('YYYY-MM-DD')
						: null,
					advanceGuaranteeAmount: price(form?.advanceGuaranteeAmount),
					advanceGuaranteeEndDate: form?.advanceGuaranteeEndDate
						? moment(form?.advanceGuaranteeEndDate).format('YYYY-MM-DD')
						: null,
					contractParentUuid: _appendicesUuid as string,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					codeParentContract: '',
					nameActivity: '',
					code: '',
					contractorAndCat: [],
					startDate: '',
					totalDayAdvantage: null,
					amount: 0,
					contractExecutionAmount: 0,
					contractExecutionEndDate: '',
					advanceGuaranteeAmount: 0,
					advanceGuaranteeEndDate: '',
					contractParentUuid: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_contract_by_appendices]);
			}
		},
	});

	const handleSubmit = () => {
		if (!form?.contractorAndCat?.[0]?.contractorUuid) {
			return toastWarn({msg: 'Chọn nhà thầu!'});
		}
		if (!form?.startDate) {
			return toastWarn({msg: 'Vui lòng chọn ngày ký hợp đồng!'});
		}
		if (form?.totalDayAdvantage! < 0) {
			return toastWarn({msg: 'Thời gian thực hiện hợp đồng không hợp lệ!'});
		}

		return funcCreateContractAdditional.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreateContractAdditional.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới phụ lục hợp đồng</h4>
				<div className={styles.form}>
					<div className={styles.head}>
						<h4>Thông tin hợp đồng</h4>
					</div>
					<div className={styles.main_form}>
						<div>
							<Input
								label={
									<span>
										Hợp đồng chính <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập hợp đồng chính '
								type='text'
								name='codeParentContract'
								readOnly={true}
								value={form?.codeParentContract}
							/>
						</div>
						<div className={clsx(styles.col_2, styles.mt)}>
							<Input
								label={
									<span>
										Tên công việc <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập tên công việc '
								type='text'
								name='nameActivity'
								readOnly={true}
								value={form?.nameActivity}
							/>
							<div>
								<Input
									label={
										<span>
											Số hợp đồng <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập số hợp đồng '
									type='text'
									name='code'
									value={form?.code}
									isRequired={true}
								/>
							</div>
						</div>

						<div className={clsx(styles.col_2, styles.mt)}>
							<DatePicker
								onClean={true}
								icon={true}
								label={
									<span>
										Ngày ký hợp đồng <span style={{color: 'red'}}>*</span>
									</span>
								}
								name='startDate'
								value={form.startDate}
								placeholder='Chọn ngày ký hợp đồng'
								onSetValue={(date) =>
									setForm((prev) => ({
										...prev,
										startDate: date,
									}))
								}
							/>
							<Input
								label={
									<span>
										Thời gian thực hiện hợp đồng <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập số ngày'
								type='number'
								name='totalDayAdvantage'
								value={form?.totalDayAdvantage}
								isRequired={true}
							/>
						</div>

						<div className={clsx(styles.mt)}>
							<Input
								label={
									<span>
										Giá trị hợp đồng <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập giá trị hợp đồng '
								type='text'
								isMoney
								name='amount'
								value={form?.amount}
								unit='VND'
								isRequired={true}
							/>
						</div>
					</div>

					<div className={styles.head}>
						<h4>Thông tin nhà thầu</h4>
					</div>
					<div className={styles.main_form}>
						<GridColumn col_2>
							<p className={styles.label}>
								Tên nhà thầu <span style={{color: 'red'}}>*</span>
							</p>
							<p className={styles.label}>
								Nhóm nhà thầu <span style={{color: 'red'}}>*</span>
							</p>
						</GridColumn>
						{form?.contractorAndCat?.map((v, i) => (
							<ItemContractorProject key={i} index={i} data={v} form={form} setForm={setForm} />
						))}
						<div
							className={clsx(styles.mt, styles.btn_add)}
							onClick={() =>
								setForm((prev) => ({
									...prev,
									contractorAndCat: [
										...prev.contractorAndCat,
										{
											contractorUuid: '',
											contractorCatUuid: '',
										},
									],
								}))
							}
						>
							{/* <div>
								<AddCircle size={20} />
							</div>
							<p>Thêm nhóm nhà thầu</p> */}
						</div>
					</div>

					<div className={clsx(styles.head, styles.mt)}>
						<h4>Thông tin bảo lãnh hợp đồng</h4>
					</div>
					<div className={styles.main_form}>
						<div className={clsx(styles.col_2)}>
							<Input
								label={<span>Giá trị bảo lãnh thực hiện hợp đồng</span>}
								placeholder='Nhập giá trị bảo lãnh thực hiện hợp đồng'
								type='text'
								isMoney
								name='contractExecutionAmount'
								value={form?.contractExecutionAmount}
								unit='VND'
							/>
							<DatePicker
								onClean={true}
								icon={true}
								label={<span>Ngày kết thúc bảo lãnh thực hiện hợp đồng</span>}
								name='contractExecutionEndDate'
								value={form.contractExecutionEndDate}
								placeholder='Chọn ngày'
								onSetValue={(date) =>
									setForm((prev) => ({
										...prev,
										contractExecutionEndDate: date,
									}))
								}
							/>
						</div>

						<div className={clsx(styles.col_2, styles.mt)}>
							<Input
								label={<span>Giá trị bảo lãnh tạm ứng</span>}
								placeholder='Nhập giá trị bảo lãnh tạm ứng'
								type='text'
								isMoney
								name='advanceGuaranteeAmount'
								value={form?.advanceGuaranteeAmount}
								unit='VND'
							/>
							<DatePicker
								onClean={true}
								icon={true}
								label={<span>Ngày kết thúc bảo lãnh tạm ứng</span>}
								name='advanceGuaranteeEndDate'
								value={form.advanceGuaranteeEndDate}
								placeholder='Chọn ngày'
								onSetValue={(date) =>
									setForm((prev) => ({
										...prev,
										advanceGuaranteeEndDate: date,
									}))
								}
							/>
						</div>
					</div>
				</div>

				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<FormContext.Consumer>
						{({isDone}) => (
							<div className={styles.btn}>
								<Button disable={!isDone} p_12_20 primary rounded_6 icon={<FolderOpen size={18} color='#fff' />}>
									Lưu lại
								</Button>
							</div>
						)}
					</FormContext.Consumer>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Form>
	);
}

export default FormAppendicesContract;

function ItemContractorProject({
	index,
	data,
	form,
	setForm,
}: {
	index: number;
	data: {contractorUuid: string; contractorCatUuid: string};
	form: IFormAppendicesContract;
	setForm: (any: any) => void;
}) {
	const router = useRouter();
	const {_activityUuid} = router.query;
	const {data: dropdownContractorInProject} = useQuery([QUERY_KEY.dropdown_contractor_in_project], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.categoryContractorInProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: _activityUuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_activityUuid,
	});

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor, data?.contractorUuid], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					contractorUuid: data?.contractorUuid,
					activityUuid: _activityUuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!data?.contractorUuid && !!_activityUuid,
	});

	const handleChangeValue = (index: number, name: string, value: any) => {
		const newData = [...form.contractorAndCat];

		// newData[index] = {
		// 	...newData[index],
		// 	[name]: value,
		// };

		newData[index] = {
			...newData[index],
			[name]: value,
			...(name === 'contractorUuid' ? {contractorCatUuid: ''} : {}),
		};

		setForm((prev: any) => ({
			...prev,
			contractorAndCat: newData,
		}));
	};

	// const handleDelete = () => {
	// 	const updateData = [...form.contractorAndCat];
	// 	updateData.splice(index, 1);

	// 	setForm((prev: any) => ({
	// 		...prev,
	// 		contractorAndCat: [...updateData],
	// 	}));
	// };
	return (
		<div className={clsx(styles.contractorProject, styles.col_2)}>
			<Select isSearch={true} readOnly={true} name='contractorUuid' value={data?.contractorUuid} placeholder='Chọn'>
				{dropdownContractorInProject?.map((v: any) => (
					<Option
						key={v.uuid}
						value={v.uuid}
						title={v?.name}
						onClick={() => handleChangeValue(index, 'contractorUuid', v?.uuid)}
					/>
				))}
			</Select>
			<div className={styles.grid}>
				<Select isSearch={true} readOnly={true} name='contractorCatUuid' value={data?.contractorCatUuid} placeholder='Chọn'>
					{listGroupContractor?.map((v: any) => (
						<Option
							key={v.uuid}
							value={v.uuid}
							title={v?.name}
							onClick={() => handleChangeValue(index, 'contractorCatUuid', v?.uuid)}
						/>
					))}
				</Select>
				{/* <div className={styles.delete} onClick={handleDelete}>
					<Trash size={22} color='#fff' />
				</div> */}
			</div>
		</div>
	);
}
