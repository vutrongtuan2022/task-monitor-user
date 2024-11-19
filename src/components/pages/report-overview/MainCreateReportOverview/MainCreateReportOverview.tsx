import React, {useState} from 'react';

import {PropsMainCreateReportOverview} from './interfaces';
import styles from './MainCreateReportOverview.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import overviewServices from '~/services/overviewServices';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {CreateReportOverview} from './context';
import ProjectReportOverview from './components/ProjectReportOverview';
import WorkReportOverview from './components/WorkReportOverview';
import DisbursementReportOverview from './components/DisbursementReportOverview';
import PlanReportOverview from './components/PlanReportOverview';
import TableContracfund from './components/TableContracfund/TableContracfund';

function MainCreateReportOverview({}: PropsMainCreateReportOverview) {
	const router = useRouter();
	const today = new Date();

	const {_type} = router.query;

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<{
		year: number | null;
		month: number | null;
		projectUuid: string;
	}>({
		year: today.getFullYear(),
		month: null,
		projectUuid: '',
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

	const funcCreateReportOverview = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm báo cáo thành công!',
				http: overviewServices.upsertReportOverview({
					uuid: '',
					year: form.year!,
					month: form.month!,
					projectUuid: form.projectUuid,
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
		return funcCreateReportOverview.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreateReportOverview.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportDisbursement,
						title: 'Báo cáo tổng hợp',
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
						<div className={styles.btn}>
							<Button
								p_14_24
								rounded_8
								blueLinear
								disable={!form.year || !form.month || !form.projectUuid}
								onClick={handleSubmit}
							>
								Gửi báo cáo
							</Button>
						</div>
					</div>
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin tổng hợp</h4>
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
										}}
									/>
								))}
							</Select>
						</div>
					</div>
				</div>

				{form.year && form.month && form.projectUuid ? (
					<CreateReportOverview.Provider
						value={{
							year: form.year,
							month: form.month,
							projectUuid: form.projectUuid,
						}}
					>
						<div className={clsx(styles.basic_info, styles.mt)}>
							<div className={styles.main_tab}>
								<TabNavLink
									query='_type'
									listHref={[
										{
											pathname: PATH.ReportOverview,
											query: null,
											title: 'Thông tin dự án',
										},
										{
											pathname: PATH.ReportOverview,
											query: 'work',
											title: 'Công việc thực hiện',
										},
										{
											pathname: PATH.ReportOverview,
											query: 'disbursement',
											title: 'Thông tin giải ngân',
										},
										{
											pathname: PATH.ReportOverview,
											query: 'plan',
											title: 'Kế hoạch tiếp theo',
										},
									]}
								/>
							</div>
							<div className={styles.line}></div>
							<div className={styles.main_table}>
								{!_type && <ProjectReportOverview />}
								{_type == 'work' && <WorkReportOverview />}
								{_type == 'disbursement' && (
									<div>
										<DisbursementReportOverview />
										<TableContracfund />
									</div>
								)}
								{_type == 'plan' && <PlanReportOverview />}
							</div>
						</div>
					</CreateReportOverview.Provider>
				) : null}
			</div>
		</div>
	);
}

export default MainCreateReportOverview;
