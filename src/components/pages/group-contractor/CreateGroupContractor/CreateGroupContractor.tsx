import React, {useState} from 'react';

import {PropsCreateGroupContractor} from './interfaces';
import styles from './CreateGroupContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function CreateGroupContractor({onClose}: PropsCreateGroupContractor) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; note: string}>({
		name: '',
		note: '',
	});

	const funcCreateGroupContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm nhóm nhà thầu thành công!',
				http: contractorcatServices.upsertContractorCat({
					uuid: '',
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
		<Form form={form} setForm={setForm} onSubmit={funcCreateGroupContractor.mutate}>
			<Loading loading={funcCreateGroupContractor.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhóm nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhóm nhà thầu'
						name='name'
						type='text'
						value={form.name}
						max={255}
						isRequired
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

export default CreateGroupContractor;
