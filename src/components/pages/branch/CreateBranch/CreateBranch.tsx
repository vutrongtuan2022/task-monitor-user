import React, {useState} from 'react';

import {ICreateBranch, PropsCreateBranch} from './interfaces';
import styles from './CreateBranch.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import branchesServices from '~/services/branchesServices';
import provineServices from '~/services/provineServices';
import Select, {Option} from '~/components/common/Select';

function CreateBranch({onClose}: PropsCreateBranch) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<ICreateBranch>({
		name: '',
		note: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
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

	const funcCreateBranch = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm chi nhánh thành công!',
				http: branchesServices.upsertBranches({
					uuid: '',
					name: form.name,
					matp: form.matp,
					xaid: form.xaid,
					maqh: form.maqh,
					note: form.note,
					address: form.address,
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
				});
				queryClient.invalidateQueries([QUERY_KEY.table_branches]);
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateBranch.mutate}>
			<Loading loading={funcCreateBranch.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm chi nhánh</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên chi nhánh'
						name='name'
						type='text'
						max={255}
						value={form.name}
						isRequired
						label={
							<span>
								Tên chi nhánh <span style={{color: 'red'}}>*</span>
							</span>
						}
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

export default CreateBranch;
