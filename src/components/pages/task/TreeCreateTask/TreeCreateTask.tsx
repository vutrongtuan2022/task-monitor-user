import React, {Fragment, useState} from 'react';

import {PropsTreeCreateTask} from './interfaces';
import styles from './TreeCreateTask.module.scss';
import clsx from 'clsx';
import {AddCircle, MinusCirlce, Trash} from 'iconsax-react';
import {convertToRoman} from '~/common/funcs/optionConvert';
import Button from '~/components/common/Button';

function TreeCreateTask({task, level, stage, index, workflow, setWorkflow}: PropsTreeCreateTask) {
	const [open, setOpen] = useState<boolean>(false);

	const handleAddTask = () => {
		const newTask = {
			name: '',
			level: level + 1,
			stage: stage,
			children: [],
		};

		const updateWorkflow: any = (tasks: any[]) => {
			return tasks.map((t: any) => {
				if (t === task) {
					return {...t, children: [...t.children, newTask]};
				} else if (t.children.length > 0) {
					return {...t, children: updateWorkflow(t.children)};
				}
				return t;
			});
		};

		setOpen(true);
		setWorkflow(updateWorkflow(workflow));
	};

	const handleRemoveTask = () => {
		const removeTaskFromWorkflow: any = (tasks: any[]) => {
			return tasks
				.filter((t: any) => t !== task)
				.map((t: any) => {
					if (t.children.length > 0) {
						return {...t, children: removeTaskFromWorkflow(t.children)};
					}
					return t;
				});
		};

		setWorkflow(removeTaskFromWorkflow(workflow));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		const updateWorkflow: any = (tasks: any[]) => {
			return tasks.map((t: any) => {
				if (t === task) {
					return {...t, [name]: value};
				} else if (t.children.length > 0) {
					return {...t, children: updateWorkflow(t.children)};
				}
				return t;
			});
		};

		setWorkflow(updateWorkflow(workflow));
	};

	return (
		<Fragment>
			<div className={clsx(styles.container, {[styles.child]: level > 1})}>
				<div className={clsx(styles.icon, {[styles.disabled]: task.children.length == 0})} onClick={() => setOpen(!open)}>
					{open && task?.children?.length > 0 ? (
						<MinusCirlce size='24' color='#F95B5B' variant='Bold' />
					) : (
						<AddCircle size='24' color='#2D74FF' variant='Bold' />
					)}
				</div>
				<div className={styles.box_input}>
					<div className={styles.index}>
						{level == 1 && convertToRoman(index + 1)}
						{level == 2 && `${index + 1}`}
						{level == 3 && '#'}
						{level == 4 && '##'}
					</div>
					<input
						name='name'
						value={task?.name || ''}
						placeholder='Nhập tên công việc'
						className={styles.input}
						onChange={handleChange}
						disabled={level == 1}
					/>
				</div>
				{/* <div className={styles.list_task}>
					{level == 1 && (
						<>
							<p className={styles.task}>Task: {1}</p>
							<div className={styles.line}></div>
						</>
					)}

					{level <= 2 && (
						<>
							<p className={styles.task}>SubTask: {1}</p>
							<div className={styles.line}></div>
						</>
					)}

					<p className={styles.task}>SubSubTask: {1}</p>
				</div> */}
				<div className={styles.control}>
					{level != 1 && (
						<div className={styles.delele_task} onClick={handleRemoveTask}>
							<Trash color='#fff' size={22} />
						</div>
					)}
					{level <= 3 && (
						<div>
							<Button blue={level == 1} skyblue={level == 2} green={level == 3} rounded_6 onClick={handleAddTask}>
								{level == 1 && 'Thêm task'}
								{level == 2 && 'Thêm subtask'}
								{level == 3 && 'Thêm subsubtask'}
							</Button>
						</div>
					)}
				</div>
			</div>
			{open && task?.children?.length > 0 ? (
				<div className={clsx(styles.listTree, {[styles.level_1]: level == 1})}>
					{task?.children?.map((v: any, index: number) => (
						<TreeCreateTask
							key={index}
							index={index}
							task={v}
							level={v?.level}
							stage={v.stage}
							workflow={workflow}
							setWorkflow={setWorkflow}
						/>
					))}
				</div>
			) : null}
		</Fragment>
	);
}

export default TreeCreateTask;
