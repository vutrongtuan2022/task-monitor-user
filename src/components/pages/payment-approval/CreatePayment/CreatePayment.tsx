import React, {useState} from 'react';

import {IFormCreatePayment, PropsCreatePayment} from './interfaces';
import styles from './CreatePayment.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {QUERY_KEY, STATE_PROJECT, STATUS_CONFIG} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import contractorServices from '~/services/contractorServices';
import Select, {Option} from '~/components/common/Select';
import provineServices from '~/services/provineServices';
import {toastWarn} from '~/common/funcs/toast';
import SelectMany from '~/components/common/SelectMany';
import projectServices from '~/services/projectServices';
import contractsServices from '~/services/contractsServices';

function CreatePayment({onClose}: PropsCreatePayment) {
	const queryClient = useQueryClient();

	const [contractorCat, setContractorCat] = useState<any[]>([]);
	const [form, setForm] = useState<IFormCreatePayment>({
		projectUuid: '',
		name: '',
		note: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
		code: '',
	});

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					excludeState: STATE_PROJECT.FINISH,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listContractByActivity} = useQuery([QUERY_KEY.dropdown_contract_by_activity], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.listContractsByActivity({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	// const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
	// 	queryFn: () =>
	// 		httpRequest({
	// 			http: contractorcatServices.categoryContractorCat({
	// 				keyword: '',
	// 				status: STATUS_CONFIG.ACTIVE,
	// 				uuid: '',
	// 			}),
	// 		}),
	// 	select(data) {
	// 		return data;
	// 	},
	// });

	const listProvince = useQuery([QUERY_KEY.dropdown_province], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listProvine({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listDistrict = useQuery([QUERY_KEY.dropdown_district, form.matp], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listDistrict({
					keyword: '',
					idParent: form.matp,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.matp,
	});

	const listTown = useQuery([QUERY_KEY.dropdown_town, form.maqh], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listTown({
					keyword: '',
					idParent: form.maqh,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.maqh,
	});

	const funcCreatePayment = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm nhà thầu thành công!',
				http: contractorServices.sendRequestContractor({
					uuid: '',
					lstType: contractorCat?.map((v: any) => v?.uuid),
					name: form.name,
					note: form.note,
					matp: form.matp,
					maqh: form.maqh,
					xaid: form.xaid,
					address: form.address,
					code: form.code,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					projectUuid: '',
					name: '',
					note: '',
					matp: '',
					maqh: '',
					xaid: '',
					address: '',
					code: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_contractor]);
			}
		},
	});

	const handleSubmit = () => {
		if (contractorCat?.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn nhóm nhà thầu!'});
		}

		return funcCreatePayment.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreatePayment.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới cấp số chấp thuận thanh toán</h4>
				<div className={styles.form}>
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
					<div className={styles.mt}>
						<SelectMany
							placeholder='Chọn số hợp đồng'
							label={
								<span>
									Số hợp đồng <span style={{color: 'red'}}>*</span>
								</span>
							}
							value={contractorCat}
							setValue={(contractorcat) =>
								setContractorCat(
									contractorCat?.find((v: any) => v?.uuid == contractorcat.uuid)
										? contractorCat?.filter((v: any) => v?.uuid != contractorcat.uuid)
										: [...contractorCat, contractorcat]
								)
							}
							listData={listContractByActivity?.map((v: any) => ({
								uuid: v?.uuid,
								title: v?.name,
								code: v?.code,
							}))}
						/>
					</div>
					{/* <div className={styles.mt}>
						<Input
							placeholder='Nhập mã số thuế'
							name='code'
							type='text'
							value={form.code}
							isRequired
							max={15}
							label={
								<span>
									Mã số thuế <span style={{color: 'red'}}>*</span>
								</span>
							}
						/>
					</div> */}

					{/* <div className={styles.mt}>
						<SelectMany
							placeholder='Chọn'
							label={
								<span>
									Thuộc nhóm nhà thầu <span style={{color: 'red'}}>*</span>
								</span>
							}
							value={contractorCat}
							setValue={(contractorcat) =>
								setContractorCat(
									contractorCat?.find((v: any) => v?.uuid == contractorcat.uuid)
										? contractorCat?.filter((v: any) => v?.uuid != contractorcat.uuid)
										: [...contractorCat, contractorcat]
								)
							}
							listData={listGroupContractor?.map((v: any) => ({
								uuid: v?.uuid,
								title: v?.name,
								code: v?.code,
							}))}
						/>
						<div className={styles.mt}>
							<Select isSearch name='matp' value={form.matp} placeholder='Lựa chọn' label={<span>Tỉnh/ TP</span>}>
								{listProvince?.data?.map((v: any) => (
									<Option
										key={v?.matp}
										value={v?.matp}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												matp: v?.matp,
												maqh: '',
												xaid: '',
											}))
										}
									/>
								))}
							</Select>

							<Select isSearch name='maqh' value={form.maqh} placeholder='Lựa chọn' label={<span>Quận/ Huyện</span>}>
								{listDistrict?.data?.map((v: any) => (
									<Option
										key={v?.maqh}
										value={v?.maqh}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												maqh: v?.maqh,
												xaid: '',
											}))
										}
									/>
								))}
							</Select>

							<Select isSearch name='xaid' value={form.xaid} placeholder='Lựa chọn' label={<span>Thị trấn/ Xã </span>}>
								{listTown?.data?.map((v: any) => (
									<Option
										key={v?.xaid}
										value={v?.xaid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												xaid: v?.xaid,
											}))
										}
									/>
								))}
							</Select>
						</div>
					</div> */}

					<div className={styles.mt}>
						<Input
							placeholder='Nhập địa chỉ'
							name='address'
							type='text'
							max={255}
							value={form.address}
							label={<span>Địa chỉ chi tiết</span>}
						/>
					</div>

					<div className={styles.mt}>
						<TextArea name='note' placeholder='Nhập mô tả' label='Mô tả' max={5000} blur />
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
									Gửi yêu cầu
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

export default CreatePayment;
