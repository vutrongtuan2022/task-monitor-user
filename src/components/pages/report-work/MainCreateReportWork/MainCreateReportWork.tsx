import React, {useState} from 'react';

import {IActivityRegister, PropsMainCreateReportWork} from './interfaces';
import styles from './MainCreateReportWork.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form from '~/components/common/Form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import TableReportWorkLastMonth from '../TableReportWorkLastMonth';
import TableReportWorkCurrent from '../TableReportWorkCurrent';
import {CreateReportWork} from '../context';
import {toastWarn} from '~/common/funcs/toast';
import activityServices from '~/services/activityServices';
import Loading from '~/components/common/Loading';

function MainCreateReportWork({}: PropsMainCreateReportWork) {
	const router = useRouter();
	const today = new Date();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_type} = router.query;

	const [form, setForm] = useState<{
		year: number | null;
		month: number | null;
		projectUuid: string;
		description: string;
	}>({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		projectUuid: '',
		description: '',
	});
	const [listActivity, setListActivity] = useState<IActivityRegister[]>([]);

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcRegisterActivitieWithMonth = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm báo cáo thành công!',
				http: activityServices.registerActivitieWithMonth({
					reportTitle: '',
					branchFeedback: '',
					year: form.year!,
					month: form.month!,
					projectUuid: form.projectUuid,
					reportNote: form.description,
					listActivityForMonthlyRegister: listActivity?.map((v) => ({
						...v,
						parentTaskUuid: v?.parentTaskUuid || null,
					})),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
	});

	const handleSubmit = () => {
		if (listActivity.length == 0) {
			return toastWarn({msg: 'Vui lòng thêm công việc báo cáo!'});
		}

		return funcRegisterActivitieWithMonth.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcRegisterActivitieWithMonth.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách báo cáo',
					},
					{
						path: '',
						title: 'Thêm mới báo cáo',
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
							Hủy bỏ
						</Button>
						<Button
							p_14_24
							rounded_8
							blueLinear
							disable={!form.year || !form.month || !form.projectUuid}
							onClick={handleSubmit}
						>
							Lưu lại
						</Button>
					</div>
				}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
					<div className={styles.basic_info}>
						<div className={styles.head}>
							<h4>Thông tin cơ bản</h4>
						</div>
						<div className={styles.form}>
							<div className={styles.col_2}>
								<div className={styles.col_2}>
									<Select
										isSearch={true}
										label={
											<span>
												Kế hoạch năm <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='year'
										value={form.year}
										placeholder='Chọn'
									>
										{years?.map((v: any) => (
											<Option
												key={v}
												value={v}
												title={`Năm ${v}`}
												onClick={() =>
													setForm((prev: any) => ({
														...prev,
														year: v,
													}))
												}
											/>
										))}
									</Select>
									<div>
										<Select
											isSearch={true}
											label={
												<span>
													Kế hoạch tháng <span style={{color: 'red'}}>*</span>
												</span>
											}
											name='month'
											value={form.month}
											placeholder='Chọn'
										>
											{months?.map((v: any) => (
												<Option
													key={v}
													value={v}
													title={`Tháng ${v}`}
													onClick={() =>
														setForm((prev: any) => ({
															...prev,
															month: v,
														}))
													}
												/>
											))}
										</Select>
									</div>
								</div>
								<Select
									isSearch={true}
									label={
										<span>
											Chọn dự án <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='projectUuid'
									value={form.projectUuid}
									placeholder='Chọn'
								>
									{listProject?.map((v: any) => (
										<Option
											key={v?.uuid}
											value={v?.uuid}
											title={v?.name}
											onClick={() => {
												setForm((prev: any) => ({
													...prev,
													projectUuid: v?.uuid,
												}));
												setListActivity([]);
											}}
										/>
									))}
								</Select>
							</div>
							<div className={styles.mt}>
								<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả' />
							</div>
						</div>
					</div>
					<div className={clsx(styles.mt, styles.form_list_task)}>
						<div className={styles.main_tab}>
							<TabNavLink
								query='_type'
								listHref={[
									{
										pathname: PATH.ProjectCreate,
										query: null,
										title: 'Báo cáo tháng trước',
									},
									{
										pathname: PATH.ProjectCreate,
										query: 'report',
										title: 'Báo cáo hiện tại',
									},
								]}
							/>
						</div>
						<div className={styles.line}></div>
						<div className={styles.head}>
							<h4>Danh sách công việc</h4>
						</div>
						<div className={styles.main_table}>
							<CreateReportWork.Provider
								value={{
									projectUuid: form.projectUuid,
									listActivity: listActivity,
									setListActivity: setListActivity,
								}}
							>
								{!_type && <TableReportWorkLastMonth projectUuid={form.projectUuid} />}
								{_type == 'report' && <TableReportWorkCurrent />}
							</CreateReportWork.Provider>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainCreateReportWork;
