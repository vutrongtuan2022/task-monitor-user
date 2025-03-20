import React, {useState} from 'react';

import {IFormCreateContractor, PropsCreateContractor} from './interfaces';
import styles from './CreateContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import contractorServices from '~/services/contractorServices';
import Select, {Option} from '~/components/common/Select';
import provineServices from '~/services/provineServices';
import {toastWarn} from '~/common/funcs/toast';
import SelectMany from '~/components/common/SelectMany';

function CreateContractor({onClose}: PropsCreateContractor) {
	const queryClient = useQueryClient();

	const [contractorCat, setContractorCat] = useState<any[]>([]);
	const [form, setForm] = useState<IFormCreateContractor>({
		name: '',
		note: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
		code: '',
	});

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

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

	const funcCreateContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm nhà thầu thành công!',
				http: contractorServices.upsertContractor({
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
					name: '',
					note: '',
					matp: '',
					maqh: '',
					xaid: '',
					address: '',
					code: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_contractor]);
			}
		},
	});

	const handleSubmit = () => {
		if (contractorCat?.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn nhóm nhà thầu!'});
		}

		return funcCreateContractor.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreateContractor.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhà thầu'
						name='name'
						type='text'
						value={form.name}
						isRequired
						max={255}
						label={
							<span>
								Tên nhà thầu <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
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

					<div className={styles.mt}>
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
					</div>

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

export default CreateContractor;
