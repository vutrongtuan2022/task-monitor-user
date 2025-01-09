import React, {useState} from 'react';

import {ITaskCreate, PropsMainCreateTask} from './interfaces';
import styles from './MainCreateTask.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';
import TreeCreateTask from '../TreeCreateTask';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import taskCatServices from '~/services/taskCatServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';

function MainCreateTask({}: PropsMainCreateTask) {
	const router = useRouter();

	const [form, setForm] = useState<{name: string}>({
		name: '',
	});

	const [workflow, setWorkflow] = useState<ITaskCreate[]>([
		{
			name: 'Giai đoạn chuẩn bị đầu tư',
			level: 1,
			stage: 1,
			children: [],
		},
		{
			name: 'Giai đoạn thực hiện đầu tư',
			level: 1,
			stage: 2,
			children: [],
		},
		{
			name: 'Giai đoạn kết thúc đầu tư',
			level: 1,
			stage: 3,
			children: [],
		},
	]);

	const validateNames = (tasks: any[]): boolean => {
		for (const task of tasks) {
			if (task.name.trim() === '') {
				return false;
			}

			if (task.children.length > 0) {
				const isValidChildren = validateNames(task.children);
				if (!isValidChildren) {
					return false;
				}
			}
		}

		return true;
	};

	const removeLevel = (tasks: any[]): any[] => {
		return tasks.map(({level, children, ...rest}) => {
			return {
				...rest,
				children: children.length > 0 ? removeLevel(children) : [],
			};
		});
	};

	const fucnInsertTaskCat = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới quy trình thành công!',
				http: taskCatServices.insertTaskCat({
					name: form.name,
					workflow: removeLevel(workflow)?.reduce((prev, cur) => [...prev, ...cur.children], []),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
	});

	const handleInsertTaskCat = () => {
		if (!form.name) {
			return toastWarn({msg: 'Nhập tên quy trình!'});
		}
		if (!validateNames(workflow)) {
			return toastWarn({msg: 'Nhập đầy đủ tên công việc!'});
		}

		return fucnInsertTaskCat.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnInsertTaskCat.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Task,
						title: 'Danh sách quy trình',
					},
					{
						path: '',
						title: 'Thêm mới quy trình',
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
						<Button p_14_24 rounded_8 primaryLinear onClick={handleInsertTaskCat}>
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
							{workflow?.map((v, i) => (
								<TreeCreateTask
									key={i}
									index={i}
									task={v}
									level={v?.level}
									stage={v.stage}
									workflow={workflow}
									setWorkflow={setWorkflow}
								/>
							))}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainCreateTask;
