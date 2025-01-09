import React, {useState} from 'react';

import {IUpdateAccount, PropsUpdateAccount} from './interfaces';
import styles from './UpdateAccount.module.scss';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import router from 'next/router';
import {QUERY_KEY, TYPE_GENDER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import Loading from '~/components/common/Loading';
import accountServices from '~/services/accountServices';
import roleServices from '~/services/roleServices';

function UpdateAccount({onClose}: PropsUpdateAccount) {
	const queryClient = useQueryClient();

	const {_uuidAccount} = router.query;

	const [form, setForm] = useState<IUpdateAccount>({
		uuid: '',
		userName: '',
		roleUuid: '',
	});

	useQuery([QUERY_KEY.detail_account], {
		queryFn: () =>
			httpRequest({
				http: accountServices.detailAccount({
					uuid: _uuidAccount as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				uuid: data?.uuid,
				userName: data?.userName,
				roleUuid: data?.role?.uuid || '',
			});
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidAccount,
	});

	const funcCreateUser = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa tài khoản thành công!',
				http: accountServices.updatetAccount({
					uuid: form.uuid,
					roleUuid: form.roleUuid,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					uuid: '',
					userName: '',
					roleUuid: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_account]);
			}
		},
	});

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

	const handleSubmit = async () => {
		return funcCreateUser.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcCreateUser.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Chỉnh sửa tài khoản</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập username'
						name='userName'
						type='text'
						readOnly={true}
						value={form.userName}
						isRequired
						label={
							<span>
								Tên tài khoản <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={styles.mt}>
						<Select
							isSearch
							name='roleUuid'
							value={form.roleUuid}
							placeholder='Lựa chọn'
							label={
								<span>
									Nhóm quyền <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listRole?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											roleUuid: v?.uuid,
										}))
									}
								/>
							))}
						</Select>
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

export default UpdateAccount;
