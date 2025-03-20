import React, {useState} from 'react';

import {PropsUpdateGroupContractor} from './interfaces';
import styles from './UpdateGroupContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';

function UpdateGroupContractor({onClose}: PropsUpdateGroupContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidGroupContractor} = router.query;

	const [form, setForm] = useState<{name: string; note: string}>({
		name: '',
		note: '',
	});

	useQuery([QUERY_KEY.detail_group_contractor, _uuidGroupContractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.detailContractorCat({
					uuid: _uuidGroupContractor as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: data?.name || '',
					note: data?.note || '',
				});
			}
		},
		enabled: !!_uuidGroupContractor,
	});

	const funcUpdateGroupContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật nhóm nhà thầu thành công!',
				http: contractorcatServices.upsertContractorCat({
					uuid: _uuidGroupContractor as string,
					name: form.name,
					note: form.note,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					name: '',
					note: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_group_contractor]);
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcUpdateGroupContractor.mutate}>
			<Loading loading={funcUpdateGroupContractor.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Chỉnh sửa nhóm nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhóm nhà thầu'
						name='name'
						type='text'
						value={form.name}
						isRequired
						max={255}
						label={
							<span>
								Tên nhóm nhà thầu <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<div className={styles.note}>
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

export default UpdateGroupContractor;
