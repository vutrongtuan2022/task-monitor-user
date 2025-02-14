import React, {useState} from 'react';

import {PropsFormCreateContract} from './interfaces';
import styles from './FormCreateContract.module.scss';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import {AddCircle, FolderOpen, Trash} from 'iconsax-react';
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
import {price} from '~/common/funcs/convertCoin';
import Loading from '~/components/common/Loading';
import GridColumn from '~/components/layouts/GridColumn';

interface IFormCreateContract {
	nameActivity: string;
	code: string;
	contractorAndCat: {
		contractorUuid: string;
		contractorCatUuid: string;
	}[];
	startDate: string;
	totalDayAdvantage: number | null;
	amount: number;
	contractExecutionAmount: number;
	contractExecutionEndDate: string;
	advanceGuaranteeAmount: number;
	advanceGuaranteeEndDate: string;
}

function FormCreateContract({onClose, nameActivity}: PropsFormCreateContract) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_activityUuid} = router.query;

	const [form, setForm] = useState<IFormCreateContract>({
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
	});

	// const {data: dropdownContractorInProject} = useQuery([QUERY_KEY.dropdown_contractor_in_project], {
	// 	queryFn: () =>
	// 		httpRequest({
	// 			http: contractorServices.categoryContractorInProject({
	// 				keyword: '',
	// 				status: STATUS_CONFIG.ACTIVE,
	// 				uuid: _activityUuid as string,
	// 			}),
	// 		}),
	// 	select(data) {
	// 		return data;
	// 	},
	// 	enabled: !!_activityUuid,
	// });

	// const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor, form?.contractorAndCat?.[0]?.contractorUuid], {
	// 	// map((v)=>(v.contractorUuid))], {
	// 	queryFn: () =>
	// 		httpRequest({
	// 			http: contractorcatServices.categoryContractorCat({
	// 				keyword: '',
	// 				status: STATUS_CONFIG.ACTIVE,
	// 				contractorUuid: form?.contractorAndCat?.[0]?.contractorUuid,
	// 				activityUuid: _activityUuid as string,
	// 			}),
	// 		}),
	// 	select(data) {
	// 		return data;
	// 	},
	// 	enabled: !!form?.contractorAndCat?.[0]?.contractorUuid && !!_activityUuid,
	// });

	const funcCreateContract = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới hợp đồng thành công!',
				http: contractsServices.upsertContracts({
					uuid: '',
					activityUuid: _activityUuid as string,
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
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
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
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
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

		return funcCreateContract.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreateContract.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới hợp đồng</h4>
				<div className={styles.form}>
					<div className={styles.head}>
						<h4>Thông tin hợp đồng</h4>
					</div>
					<div className={styles.main_form}>
						<div className={clsx(styles.col_2)}>
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
						<div>
						{form?.contractorAndCat?.map((v, i) => (
									<ItemContractorProject
										key={i}
										index={i}
										data={v}
										form={form?.contractorAndCat}
										setForm={setForm}
									/>
								))}
						</div>
						<div
								className={clsx(styles.mt, styles.btn_add)}
								onClick={() =>
									setForm((prev) => ({
										...prev,
										contractorAndCat: [
											...prev.contractorAndCat,
											{
												contractorUuid:'',
												contractorCatUuid:''
											},
										],
									}))
								}
							>
							<div>
								<AddCircle size={20} />
							</div>
							<p>Thêm nhóm nhà thầu</p>
						</div>
						
					</div>

					<div className={styles.head}>
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

export default FormCreateContract;

function ItemContractorProject({
	index,
	data,
	form,
	setForm,
}: {
	index: number;
	data: {contractorUuid: string; contractorCatUuid: string};
	form: {
		contractorUuid: string;
		contractorCatUuid: string;
	}[];
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

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor, form?.[0]?.contractorUuid], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					contractorUuid: form?.[0]?.contractorUuid!,
					activityUuid: _activityUuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.[0]?.contractorUuid && !!_activityUuid,
	});

	const handleChangeValue = (index: number, name: string, value: any) => {
		const newData = [...form];

		newData[index] = {
			...newData[index],
			[name]: value,
		};

		setForm(newData);
		console.log(12);
		
	};

	const handleDelete = () => {
		const updateData = [...form];
		updateData.splice(index, 1);
		setForm([...updateData]);
	};
	return (
		<div className={clsx(styles.col_2, styles.mt)}>
			
				<Select isSearch={true} name='contractorUuid' value={data?.contractorUuid} placeholder='Chọn'>
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
					<Select isSearch={true} name='contractorCatUuid' value={data?.contractorCatUuid} placeholder='Chọn'>
						{listGroupContractor?.map((v: any) => (
							<Option
								key={v.contractorCatUuid}
								value={v.contractorCatUuid}
								title={v?.name}
								onClick={() => handleChangeValue(index, 'contractorCatUuid', v?.contractorCatUuid)}
							/>
						))}
					</Select>
					{index >= 1 && (
						<div className={styles.delete} onClick={handleDelete}>
							<Trash size={22} color='#fff' />
						</div>
					)}
				</div>
			
		</div>
	);
}