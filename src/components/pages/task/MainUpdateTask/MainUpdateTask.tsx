import React, {useState} from 'react';

import {PropsMainUpdateTask} from './interfaces';
import styles from './MainUpdateTask.module.scss';
import {useRouter} from 'next/router';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';
import {useMutation, useQuery} from '@tanstack/react-query';
import {IDetailTask} from '../MainDetailTask/interfaces';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import taskCatServices from '~/services/taskCatServices';
import TreeStepTask from '../TreeStepTask';
import {ppid} from 'process';
import Loading from '~/components/common/Loading';
import {toastWarn} from '~/common/funcs/toast';

function MainUpdateTask({}: PropsMainUpdateTask) {
	const router = useRouter();

	const {_uuid} = router.query;

	const [form, setForm] = useState<{name: string}>({
		name: '',
	});

	const {data: detailTask} = useQuery<IDetailTask>([QUERY_KEY.detail_task, _uuid], {
		queryFn: () =>
			httpRequest({
				http: taskCatServices.detailTaskCat({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					name: data?.name || '',
				}));
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const fucnUpdateTaskCat = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật quy trình thành công!',
				http: taskCatServices.updateTaskCat({
					uuid: _uuid as string,
					name: form.name,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
	});

	const handleUpdateTaskCat = () => {
		if (!form.name) {
			return toastWarn({msg: 'Nhập tên quy trình!'});
		}

		return fucnUpdateTaskCat.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateTaskCat.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Task,
						title: 'Danh sách quy trình',
					},
					{
						path: '',
						title: 'Chỉnh sửa quy trình',
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button
							p_14_24
							rounded_8
							light-red
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							Hủy bỏ
						</Button>
						<Button p_14_24 rounded_8 primaryLinear disable={!form.name} onClick={handleUpdateTaskCat}>
							Lưu lại
						</Button>
					</div>
				}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
					<div className={styles.basic_info}>
						<div className={styles.head}>
							<h4>Thông tin quy trình</h4>
						</div>
						<div className={styles.form}>
							<Input
								label={
									<span>
										Tên quy trình <span style={{color: 'red'}}>*</span>
									</span>
								}
								type='text'
								placeholder='Nhập tên quy trình'
								name='name'
								value={form?.name}
								isRequired={true}
								blur={true}
							/>
						</div>
					</div>

					<div className={clsx(styles.basic_info, styles.mt)}>
						<div className={styles.head}>
							<h4>Công việc của quy trình</h4>
						</div>
						<div className={styles.form}>
							{detailTask?.stages?.map((stage: any, index) => (
								<TreeStepTask key={index} index={index} type={detailTask?.id} level={1} task={stage} />
							))}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainUpdateTask;
