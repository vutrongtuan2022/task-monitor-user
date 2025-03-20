import React, {useContext, useState} from 'react';

import {PropsTableWorkAdditionalCreate} from './interfaces';
import styles from './TableWorkAdditionalCreate.module.scss';
import Form, {FormContext} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import {CreateReportWork, ICreateReportWork} from '../../context';
import {QUERY_KEY, STATE_WORK, STATUS_CONFIG, TYPE_INHERIT} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import activityServices from '~/services/activityServices';
import {httpRequest} from '~/services';

function TableWorkAdditionalCreate({onClose}: PropsTableWorkAdditionalCreate) {
	const {listActivity, setListActivity, projectUuid} = useContext<ICreateReportWork>(CreateReportWork);

	const stages = [
		{
			stage: 1,
			name: 'Giai đoạn chuẩn bị đầu tư',
		},
		{
			stage: 2,
			name: 'Giai đoạn thực hiện đầu tư',
		},
		{
			stage: 3,
			name: 'Giai đoạn kết thúc đầu tư',
		},
	];

	const [form, setForm] = useState<{
		stage: number | null;
		name: string;
		parentTaskUuid: string;
		parentTaskName: string;
		inheritContractFromParent: number;
	}>({
		stage: null,
		name: '',
		parentTaskUuid: '',
		parentTaskName: '',
		inheritContractFromParent: 1,
	});

	const {data: listTasks} = useQuery([QUERY_KEY.dropdown_task_report, form.stage, projectUuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.categoryTaskByProject({
					status: STATUS_CONFIG.ACTIVE,
					stage: form.stage!,
					projectUuid: projectUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!projectUuid && !!form.stage,
	});

	const handleSaveWork = () => {
		setListActivity([
			{
				activityUuid: '',
				name: form?.name,
				parent: {
					uuid: form.parentTaskUuid,
					name: form.parentTaskName,
				},
				stage: form?.stage,
				megaType: 'SubTask',
				isInWorkFlow: false,
				state: STATE_WORK.NOT_PROCESSED,
				inheritContractFromParent: form?.inheritContractFromParent,
				children: [],
			},
			...listActivity,
		]);

		onClose();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSaveWork}>
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm công việc phát sinh</h4>
				<div className={styles.form}>
					<Select
						isSearch={true}
						label={
							<span>
								Giai đoạn thực hiện <span style={{color: 'red'}}>*</span>
							</span>
						}
						name='stage'
						value={form.stage}
						placeholder='Chọn'
					>
						{stages?.map((v) => (
							<Option
								key={v.stage}
								value={v.stage}
								title={v.name}
								onClick={() =>
									setForm((prev) => ({
										...prev,
										stage: v.stage,
										parentTaskUuid: '',
									}))
								}
							/>
						))}
					</Select>
					<Select
						isSearch={true}
						label={
							<span>
								Thuộc công việc cha (task) <span style={{color: 'red'}}>*</span>
							</span>
						}
						name='parentTaskUuid'
						value={form.parentTaskUuid}
						placeholder='Chọn'
						readOnly={!form.stage}
					>
						{listTasks?.map((v: any) => (
							<Option
								key={v.uuid}
								value={v.uuid}
								title={v.name}
								onClick={() =>
									setForm((prev) => ({
										...prev,
										parentTaskUuid: v?.uuid,
										parentTaskName: v?.name,
									}))
								}
							/>
						))}
					</Select>
					<div className={styles.note}>
						<TextArea
							name='name'
							placeholder='Nhập công việc phát sinh'
							label={
								<span>
									Tên công việc <span style={{color: 'red'}}>*</span>
								</span>
							}
							max={5000}
							isRequired={true}
							blur={true}
						/>
					</div>
					<div className={styles.item_radio}>
						<input
							id='inherit'
							className={styles.input_radio}
							type='checkbox'
							name='inheritContractFromParent'
							checked={form.inheritContractFromParent === TYPE_INHERIT.NO}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									inheritContractFromParent: e.target.checked ? TYPE_INHERIT.YES : TYPE_INHERIT.NO,
								}))
							}
						/>
						<label className={styles.input_label} htmlFor='inherit'>
							Kế thừa hợp đồng từ task cha
						</label>
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
								<Button
									disable={!isDone || !form.stage || !form.parentTaskUuid}
									p_12_20
									primary
									rounded_6
									icon={<FolderOpen size={18} color='#fff' />}
								>
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

export default TableWorkAdditionalCreate;
