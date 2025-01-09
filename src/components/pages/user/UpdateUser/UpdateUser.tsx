import React, {useState} from 'react';

import styles from './UpdateUser.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {QUERY_KEY, TYPE_GENDER} from '~/constants/config/enum';
import provineServices from '~/services/provineServices';
import Loading from '~/components/common/Loading';
import {FolderOpen} from 'iconsax-react';
import TextArea from '~/components/common/Form/components/TextArea';
import router from 'next/router';
import {IUpdateUser, PropsUpdateUser} from './interfaces';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';

function UpdateUser({onClose}: PropsUpdateUser) {
	const queryClient = useQueryClient();

	const {_uuidUser} = router.query;

	const [form, setForm] = useState<IUpdateUser>({
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

	useQuery([QUERY_KEY.detail_user], {
		queryFn: () =>
			httpRequest({
				http: userServices.detailUser({
					uuid: _uuidUser as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				uuid: data?.uuid,
				fullName: data?.fullname,
				email: data?.email,
				gender: data?.gender,
				phone: data?.phone,
				birthday: data?.birthday|| null,
				address: data?.address || '',
				matp: data?.tp?.uuid || '',
				maqh: data?.qh?.uuid || '',
				xaid: data?.xa?.uuid || '',
				note: data?.note || '',
			});
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUser,
	});

	const funcCreateUser = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa nhân viên thành công!',
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
				<h4 className={styles.title}>Chỉnh sửa nhân viên</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập họ và tên'
						name='fullName'
						type='text'
						value={form.fullName}
						max={50}
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

					<Input placeholder='Nhập ngày sinh' name='birthday' type='date' value={form?.birthday} label={<span>Ngày sinh</span>} />
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

export default UpdateUser;
