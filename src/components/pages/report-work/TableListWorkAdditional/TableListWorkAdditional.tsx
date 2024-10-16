import React, {useContext, useState} from 'react';

import {PropsTableListWorkAdditional} from './interfaces';
import styles from './TableListWorkAdditional.module.scss';
import Form, {FormContext} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import {CreateReportWork, ICreateReportWork} from '../context';
import {STATE_WORK_PROJECT} from '~/constants/config/enum';

function TableListWorkAdditional({onClose}: PropsTableListWorkAdditional) {
	const {listActivity, setListActivity} = useContext<ICreateReportWork>(CreateReportWork);

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
	}>({
		stage: null,
		name: '',
	});

	const handleSaveWork = () => {
		setListActivity([
			{
				activityUuid: '',
				name: form?.name,
				parent: null,
				stage: form?.stage,
				megaType: '',
				isInWorkFlow: false,
				state: STATE_WORK_PROJECT.NOT_PROCESSED,
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
									disable={!isDone || !form.stage}
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

export default TableListWorkAdditional;
