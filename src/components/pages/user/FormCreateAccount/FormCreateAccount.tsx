import React, {useState} from 'react';

import {PropsFormCreateAccount} from './interfaces';
import styles from './FormCreateAccount.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toastWarn} from '~/common/funcs/toast';
import {RiCloseFill} from 'react-icons/ri';
import {httpRequest} from '~/services';
import {QUERY_KEY, TYPE_SPECIAL} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import roleServices from '~/services/roleServices';
import accountServices from '~/services/accountServices';
import md5 from 'md5';
import {FolderOpen} from 'iconsax-react';

// Regex không cho phép tiếng Việt có dấu, space, ký tự đặc biệt
const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{6,255}$/;
function FormCreateAccount({dataCreateAccount, onClose}: PropsFormCreateAccount) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		userUuid: string;
		username: string;
		password: string;
		roleUuid: string;
		special: TYPE_SPECIAL;
	}>({userUuid: '', username: '', roleUuid: '', password: '', special: TYPE_SPECIAL.NORMAL});

	const listRole = useQuery([QUERY_KEY.dropdown_role], {
		queryFn: () =>
			httpRequest({
				http: roleServices.categoryRole({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcCreateAccount = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cấp tài khoản thành công',
				http: accountServices.register({
					userUuid: dataCreateAccount?.uuid || '',
					username: form.username || '',
					roleUuid: form.roleUuid || '',
					password: md5(`${form?.password}${process.env.NEXT_PUBLIC_KEY_PASS}`),
					special: form?.special,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
			}
		},
	});

	const handleSubmit = async () => {
		// Check username với regex
		// if (!usernameRegex.test(form.username)) {
		// 	return toastWarn({msg: 'Tên đăng nhập không hợp lệ'});
		// }
		// Check password với regex
		if (!passwordRegex.test(form.password)) {
			return toastWarn({msg: 'Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm chữ cái và số'});
		}

		if (!form?.roleUuid) {
			return toastWarn({msg: 'Vui lòng chọn nhóm quyền'});
		}

		return funcCreateAccount.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreateAccount.isLoading} />
			<div className={styles.header}>
				<h3 className={styles.title}>Cấp tài khoản</h3>
			</div>
			<div className={styles.btn_close}>
				<RiCloseFill size={28} color='#8492A6' onClick={onClose} />
			</div>

			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.form}>
					<Input
						name='username'
						isRequired
						placeholder='Nhập tên đăng nhập'
						label={
							<span>
								Tên đăng nhập <span style={{color: 'var(--error)'}}>*</span>
							</span>
						}
						type='text'
					/>
					<Input
						name='password'
						isRequired
						placeholder='Nhập mật khẩu'
						min={6}
						max={255}
						blur
						label={
							<span>
								Nhập mật khẩu <span style={{color: 'var(--error)'}}>*</span>
							</span>
						}
						type='password'
					/>

					<div className={styles.select}>
						<Select
							isSearch
							name='roleUuid'
							value={form.roleUuid}
							placeholder='Lựa chọn'
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									roleUuid: e.target.value,
								}))
							}
							label={
								<span>
									Nhóm quyền <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listRole?.data?.map((v: any) => (
								<Option key={v?.uuid} title={v?.name} value={v?.uuid} />
							))}
						</Select>
					</div>
					{listRole?.data?.find((v: any) => v?.uuid == form?.roleUuid)?.code == 'R1' && (
						<div className={styles.type_special}>
							<input
								type='checkbox'
								name='type_special'
								id='type_special'
								checked={form?.special == TYPE_SPECIAL.SENIOR}
								onChange={(e) => {
									const {checked} = e.target;

									if (checked) {
										setForm((prev) => ({
											...prev,
											special: TYPE_SPECIAL.SENIOR,
										}));
									} else {
										setForm((prev) => ({
											...prev,
											special: TYPE_SPECIAL.NORMAL,
										}));
									}
								}}
							/>
							<label htmlFor='type_special'>Nhân viên cấp cao</label>
						</div>
					)}
					<div className={styles.group_button}>
						<div className={styles.btn}>
							<div>
								<Button p_12_20 white_outline rounded_8 onClick={onClose} maxContent>
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
					</div>
				</div>
			</Form>
		</div>
	);
}

export default FormCreateAccount;
