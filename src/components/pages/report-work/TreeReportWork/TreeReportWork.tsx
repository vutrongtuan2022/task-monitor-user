import React, {Fragment, useState} from 'react';

import {PropsTreeReportWork} from './interfaces';
import styles from './TreeReportWork.module.scss';
import {AddCircle, MinusCirlce} from 'iconsax-react';
import {convertToRoman} from '~/common/funcs/optionConvert';
import StateActive from '~/components/common/StateActive';
import {STATE_WORK_PROJECT} from '~/constants/config/enum';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';

function TreeReportWork({level, index, activity, isChecked, toggleNode}: PropsTreeReportWork) {
	const [open, setOpen] = useState<boolean>(level <= 1 ? true : false);

	return (
		<Fragment>
			<div style={{marginLeft: `${(level - 1) * 24}px`}} className={styles.container}>
				<div
					className={clsx(styles.icon, {[styles.disabled]: activity?.children?.length == 0})}
					onClick={() => {
						if (activity?.children?.length > 0) {
							return setOpen(!open);
						} else {
							return null;
						}
					}}
				>
					{open ? (
						<MinusCirlce size='24' color='#F95B5B' variant='Bold' />
					) : (
						<AddCircle size='24' color='#2D74FF' variant='Bold' />
					)}
				</div>
				<div
					className={clsx(styles.main, {
						[styles.level_1]: level == 1,
						[styles.level_2]: level == 2,
						[styles.level_3]: level == 3,
						[styles.level_4]: level == 4,
					})}
				>
					<input
						className={styles.checkbox}
						type='checkbox'
						checked={isChecked(activity.activityUuid!)}
						onChange={(e) => toggleNode(activity, e.target.checked)}
					/>
					<div className={styles.index}>
						{level == 1 && convertToRoman(index + 1)}
						{level == 2 && `${index + 1}`}
						{level == 3 && '#'}
						{level == 4 && '##'}
					</div>
					<div className={styles.line}></div>
					<div className={styles.box_name}>
						<Tippy content={activity?.name}>
							<p className={styles.name}>{activity.name}</p>
						</Tippy>
					</div>
					{activity?.registeredMonth && (
						<>
							<p className={styles.task}>
								Đã báo cáo tháng <span>{activity?.registeredMonth}</span>
							</p>
							<div className={styles.line}></div>
						</>
					)}
					{level == 1 && (
						<>
							<p className={styles.task}>
								Task: <span>{activity?.taskCount?.task}</span>
							</p>
							<div className={styles.line}></div>
						</>
					)}
					{level <= 2 && (
						<>
							<p className={styles.task}>
								SubTask: <span>{activity?.taskCount?.subTask}</span>
							</p>
							<div className={styles.line}></div>
						</>
					)}
					{level <= 3 && (
						<p className={styles.task}>
							SubSubTask: <span>{activity?.taskCount?.subSubTask}</span>
						</p>
					)}

					{level > 1 && (
						<StateActive
							stateActive={activity?.state}
							listState={[
								{
									state: STATE_WORK_PROJECT.NOT_PROCESSED,
									text: 'Chưa xử lý',
									textColor: '#FFFFFF',
									backgroundColor: '#FDAD73',
								},
								{
									state: STATE_WORK_PROJECT.PROCESSING,
									text: 'Đang xử lý',
									textColor: '#FFFFFF',
									backgroundColor: '#16C1F3',
								},
								{
									state: STATE_WORK_PROJECT.COMPLETED,
									text: 'Đã hoàn thành',
									textColor: '#FFFFFF',
									backgroundColor: '#06D7A0',
								},
							]}
						/>
					)}
				</div>
			</div>

			{open && (
				<>
					{activity?.children?.map((v, index: number) => (
						<TreeReportWork
							key={v.activityUuid}
							activity={v}
							index={index}
							level={level + 1}
							isChecked={isChecked}
							toggleNode={toggleNode}
						/>
					))}
				</>
			)}
		</Fragment>
	);
}

export default TreeReportWork;
