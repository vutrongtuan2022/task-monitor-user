import React, {Fragment, useState} from 'react';

import {PropsTreeStepTask} from './interfaces';
import styles from './TreeStepTask.module.scss';
import {AddCircle, MinusCirlce} from 'iconsax-react';
import {convertToRoman} from '~/common/funcs/optionConvert';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {RiLoader4Fill} from 'react-icons/ri';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import taskServices from '~/services/taskServices';

function TreeStepTask({index, type, level, task}: PropsTreeStepTask) {
	const router = useRouter();

	const {_uuid} = router.query;

	const [open, setOpen] = useState<boolean>(false);

	const {data: listTreeTask, isLoading} = useQuery([QUERY_KEY.tree_task, _uuid, task?.uuid, task.stt, task.stage, type, open], {
		queryFn: () =>
			httpRequest({
				http: taskServices.listParentTask({
					uuid: task?.uuid || '',
					stage: task?.stt || task.stage,
					type: type,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid && open,
	});

	return (
		<Fragment>
			<div className={clsx(styles.container, {[styles.child]: level > 1})}>
				<div className={styles.icon} onClick={() => setOpen(!open)}>
					{(level == 1 && task.totalTask == 0) ||
					(level == 2 && task.totalSubTask == 0) ||
					(level == 3 && task.totalSubTask == 0 && level == 3 && task.totalSubSubTask == 0) ||
					(level == 4 && task.totalSubSubTask == 0) ? null : (
						<>
							{open ? (
								<MinusCirlce size='24' color='#F95B5B' variant='Bold' />
							) : (
								<AddCircle size='24' color='#2D74FF' variant='Bold' />
							)}
						</>
					)}
				</div>
				<Tippy content={task?.name}>
					<div className={styles.box_input}>
						<div className={styles.index}>
							{level == 1 && convertToRoman(index + 1)}
							{level == 2 && `${index + 1}`}
							{level == 3 && '#'}
							{level == 4 && '##'}
						</div>

						<input value={task?.name} placeholder='Nhập tên công việc' className={styles.input} disabled={true} />
					</div>
				</Tippy>
				<div className={styles.list_task}>
					{level == 1 && (
						<>
							<p className={styles.task}>
								Task: <span>{task?.totalTask}</span>
							</p>
							<div className={styles.line}></div>
						</>
					)}
					{level <= 2 && (
						<>
							<p className={styles.task}>
								SubTask: <span>{task?.totalSubTask}</span>
							</p>
							<div className={styles.line}></div>
						</>
					)}
					<p className={styles.task}>
						SubSubTask: <span>{level == 3 ? task?.totalSubTask : task?.totalSubSubTask}</span>
					</p>
				</div>
			</div>

			{open && (
				<div className={clsx(styles.listTree, {[styles.level_1]: level == 1, [styles.tree_loading]: isLoading})}>
					{isLoading ? (
						<div className={styles.loading}>
							<RiLoader4Fill size={24} color='#2D74FF' />
						</div>
					) : (
						<>
							{listTreeTask?.map((v: any, index: number) => (
								<TreeStepTask key={v.uuid} task={v} index={index} type={type} level={level + 1} />
							))}
						</>
					)}
				</div>
			)}
		</Fragment>
	);
}

export default TreeStepTask;
