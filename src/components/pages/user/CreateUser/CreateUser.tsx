import React, {useState} from 'react';

import {ICreateUser, PropsCreateUser} from './interfaces';
import styles from './CreateUser.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Loading from '~/components/common/Loading';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {QUERY_KEY, TYPE_GENDER} from '~/constants/config/enum';

import Select, {Option} from '~/components/common/Select';
import provineServices from '~/services/provineServices';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';

function CreateUser({onClose}: PropsCreateUser) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<ICreateUser>({
		uuid: '',
		fullName: '',
		email: '',
		gender: TYPE_GENDER.MALE,
		phone: '',
		birthday: null,
		address: '',
		matp: '',
		maqh: '',
		xaid: '',
		note: '',
	});

	const funcCreateUser = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm nhân viên thành công!',
				http: userServices.upsertUser({
					uuid: form.uuid,
					fullName: form.fullName,
					email: form.email,
					gender: form.gender,
					phone: form.phone,
					birthday: !!form.birthday ? moment(form?.birthday).format('YYYY-MM-DD') : null,
					address: form.address,
					matp: form.matp,
					maqh: form.maqh,
					xaid: form.xaid,
					note: form.note,
				}),
			});
		},

		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					uuid: '',
					fullName: '',
					email: '',
					gender: TYPE_GENDER.MALE,
					phone: '',
					birthday: null,
					address: '',
					matp: '',
					maqh: '',
					xaid: '',
					note: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
			}
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

	const handleSubmit = async () => {
		const today = new Date();
		const birthday = new Date(form?.birthday!);

		if (!!birthday && today < birthday!) {
			return toastWarn({msg: 'Ngày sinh không hợp lệ!'});
		}

		return funcCreateUser.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreateUser.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhân viên</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập họ và tên'
						name='fullName'
						type='text'
						max={50}
						value={form.fullName}
						isRequired
						label={
							<span>
								Họ và tên <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<Input
						placeholder='Nhập số điện thoại'
						name='phone'
						type='number'
						isPhone
						value={form.phone}
						label={<span>Số điện thoại</span>}
					/>

					<Input
						placeholder='Nhập email'
						isEmail
						isRequired
						name='email'
						type='text'
						value={form.email}
						label={
							<span>
								Email <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<Input placeholder='Nhập ngày sinh' name='birthday' type='date' value={form.birthday} label={<span>Ngày sinh</span>} />
					{/* <div className={styles.mt}>
						<DatePicker
							onClean={true}
							icon={true}
							label={<span>Ngày sinh</span>}
							placeholder='dd/mm/yyyy'
							value={form?.birthday}
							onSetValue={(birthday) =>
								setForm((prev) => ({
									...prev,
									birthday: birthday,
								}))
							}
							name='birthday'
						/>
					</div> */}

					<div className={styles.gennder}>
						<label style={{fontSize: '16px', fontWeight: '500'}}>
							Giới tính<span style={{color: 'red'}}>*</span>
						</label>
						<div className={styles.group_radio}>
							<div className={styles.item_radio}>
								<input
									id='male'
									className={styles.input_radio}
									type='radio'
									name='gender'
									value={form.gender}
									checked={form.gender == TYPE_GENDER.MALE}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											gender: TYPE_GENDER.MALE,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='male'>
									Nam
								</label>
							</div>

							<div className={styles.item_radio}>
								<input
									id='female'
									className={styles.input_radio}
									type='radio'
									name='gender'
									value={form.gender}
									checked={form.gender == TYPE_GENDER.FEMALE}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											gender: TYPE_GENDER.FEMALE,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='female'>
									Nữ
								</label>
							</div>

							<div className={styles.item_radio}>
								<input
									id='other'
									className={styles.input_radio}
									type='radio'
									name='gender'
									value={form.gender}
									checked={form.gender == TYPE_GENDER.OTHER}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											gender: TYPE_GENDER.OTHER,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='other'>
									Khác
								</label>
							</div>
						</div>
					</div>

					<div className={styles.mt}>
						<Select
							isSearch
							name='matp'
							value={form.matp}
							placeholder='Chọn tỉnh/thành phố'
							label={<span>Tỉnh/Thành phố</span>}
						>
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

						<Select isSearch name='maqh' value={form.maqh} placeholder='Chọn quận/ Huyện' label={<span>Quận/ Huyện</span>}>
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

						<Select isSearch name='xaid' value={form.xaid} placeholder='Chọn xã/ Phường' label={<span>Xã/ Phường</span>}>
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

					<div className={styles.mt}>
						<Input
							placeholder='Nhập địa chỉ chi tiết'
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

export default CreateUser;
