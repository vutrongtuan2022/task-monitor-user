import React, {useState} from 'react';

import {IActivityUpdate, PropsMainUpdateReportWork} from './interfaces';
import styles from './MainUpdateReportWork.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form from '~/components/common/Form';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import activityServices from '~/services/activityServices';
import Loading from '~/components/common/Loading';
import reportServices from '~/services/reportServices';
import {UpdateReportWork} from './context';
import TableWorkLastMonthUpdate from './components/TableWorkLastMonthUpdate';
import TableWorkCurrentUpdate from './components/TableWorkCurrentUpdate';

function MainUpdateReportWork({}: PropsMainUpdateReportWork) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const today = new Date();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_type, _uuid} = router.query;

	const [listActivity, setListActivity] = useState<IActivityUpdate[]>([]);

	const [form, setForm] = useState<{
		year: number | null;
		month: number | null;
		projectUuid: string;
		description: string;
	}>({
		year: today.getFullYear(),
		month: null,
		projectUuid: '',
		description: '',
	});

	useQuery([QUERY_KEY.table_list_modify_work_report, _uuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.getAllActivityReport({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setListActivity(
					data?.map((v: any) => ({
						activityUuid: v?.activityUuid,
						reportUuid: v?.reportUuid,
						activityReportUuid: v?.activityReportUuid,
						name: v?.name,
						parent: v?.parent || null,
						stage: v?.stage,
						digitalizedState: v?.digitalizedState,
						megaType: v?.megaType || '',
						isInWorkFlow: v?.isInWorkFlow,
						state: v?.state,
						completeState: v?.completeState,
						children: [],
					}))
				);
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	useQuery([QUERY_KEY.detail_report_work, _uuid], {
		queryFn: () =>
			httpRequest({
				http: reportServices.detailReport({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					year: data?.year || today.getFullYear(),
					month: data?.month || null,
					projectUuid: data?.project?.uuid || '',
					description: data?.note || '',
				});
			}
		},
		enabled: !!_uuid,
	});

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

	const funcUpdateActivitieWithMonth = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa báo cáo thành công!',
				http: activityServices.updateActivitieWithMonth({
					reportUuid: _uuid as string,
					reportTitle: '',
					branchFeedback: '',
					year: form.year!,
					month: form.month!,
					projectUuid: form.projectUuid,
					reportNote: form.description,
					listActivityForModify: listActivity
						?.filter((v) => v?.activityUuid != '1' && v?.activityUuid != '2' && v?.activityUuid != '3') // Không lấy những activity là giai đoạn (I, II, III)
						?.map(({children, ...v}) => ({
							activityUuid: v?.activityUuid,
							isInWorkFlow: true,
							megaType: v?.megaType,
							name: v?.name,
							parent: v?.parent,
							stage: v?.stage,
							state: v?.state,
						})),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.table_list_modify_work_report]);
				queryClient.invalidateQueries([QUERY_KEY.detail_report_work]);
				queryClient.invalidateQueries([QUERY_KEY.table_list_report_work_last_month]);
				queryClient.invalidateQueries([QUERY_KEY.table_tree_work_project]);
			}
		},
	});

	const handleSubmit = () => {
		if (listActivity.length == 0) {
			return toastWarn({msg: 'Vui lòng thêm công việc báo cáo!'});
		}

		return funcUpdateActivitieWithMonth.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcUpdateActivitieWithMonth.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách báo cáo',
					},
					{
						path: '',
						title: 'Chỉnh sửa báo cáo',
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
							Cập nhật
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
							<UpdateReportWork.Provider
								value={{
									projectUuid: form.projectUuid,
									listActivity: listActivity,
									setListActivity: setListActivity,
									month: form.month,
									year: form.year,
								}}
							>
								{!_type && <TableWorkLastMonthUpdate />}
								{_type == 'report' && <TableWorkCurrentUpdate />}
							</UpdateReportWork.Provider>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainUpdateReportWork;
