import React, {useState} from 'react';

import {IDetailTask, PropsMainDetailTask} from './interfaces';
import styles from './MainDetailTask.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import clsx from 'clsx';
import Dialog from '~/components/common/Dialog';
import {useRouter} from 'next/router';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import taskCatServices from '~/services/taskCatServices';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import GridColumn from '~/components/layouts/GridColumn';
import Moment from 'react-moment';
import {QUERY_KEY} from '~/constants/config/enum';
import TreeStepTask from '../TreeStepTask';

function MainDetailTask({}: PropsMainDetailTask) {
	const router = useRouter();

	const {_uuid} = router.query;

	const [openDelete, setOpenDelete] = useState<boolean>(false);

	const {data: detailTask} = useQuery<IDetailTask>([QUERY_KEY.detail_task, _uuid], {
		queryFn: () =>
			httpRequest({
				http: taskCatServices.detailTaskCat({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcDeleteTaskCat = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa quy trình thành công!',
				http: taskCatServices.updateStatusTaskCat({
					uuid: _uuid as string,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenDelete(false);
				router.back();
			}
		},
	});

	const handleDeleteTaskCat = () => {
		if (!_uuid) {
			return toastWarn({msg: 'Không tìm thấy quy trình!'});
		}

		return funcDeleteTaskCat.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteTaskCat.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Task,
						title: 'Danh sách quy trình',
					},
					{
						path: '',
						title: 'Chi tiết quy trình',
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button p_14_24 rounded_8 light-red onClick={() => setOpenDelete(true)}>
							Xóa
						</Button>
						<Button p_14_24 rounded_8 primaryLinear href={`${PATH.UpdateTask}?_uuid=${_uuid}`}>
							Chỉnh sửa
						</Button>
					</div>
				}
			/>

			<div className={styles.basic_info}>
				<div className={styles.head}>
					<h4>Thông tin cơ bản</h4>
				</div>
				<div className={styles.progress_group}>
					<GridColumn col_2>
						<div className={styles.item}>
							<p>Tên quy trình</p>
							<p>{detailTask?.name}</p>
						</div>
						<div className={styles.item}>
							<p>Ngày tạo</p>
							<p>
								<Moment date={detailTask?.created} format='DD/MM/YYYY' />
							</p>
						</div>
					</GridColumn>
				</div>
			</div>

			<div className={clsx(styles.basic_info, styles.mt)}>
				<div className={styles.head}>
					<h4>Công việc của quy trình</h4>
				</div>
				<div className={styles.progress_group}>
					{detailTask?.stages?.map((stage: any, index) => (
						<TreeStepTask key={index} index={index} type={detailTask?.id} level={1} task={stage} />
					))}
				</div>
			</div>

			<Dialog
				type='error'
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title={'Xóa quy trình'}
				note={'Bạn có chắc chắn muốn xóa quy trình này?'}
				onSubmit={handleDeleteTaskCat}
			/>
		</div>
	);
}

export default MainDetailTask;
