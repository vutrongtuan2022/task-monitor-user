import React, {useContext, useState} from 'react';

import {IPlanReportOverview, PropsPlanReportOverview} from './interfaces';
import styles from './PlanReportOverview.module.scss';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT_WORK, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import overviewServices from '~/services/overviewServices';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import StateActive from '~/components/common/StateActive';
import Pagination from '~/components/common/Pagination';
import {CreateReportOverview, ICreateReportOverview} from '../../context';
import activityServices from '~/services/activityServices';

function PlanReportOverview({}: PropsPlanReportOverview) {
	const {year, month, projectUuid} = useContext<ICreateReportOverview>(CreateReportOverview);

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);

	const {data: nextPlanReport, isLoading} = useQuery(
		[QUERY_KEY.table_next_plan_report_overview, page, pageSize, year, month, projectUuid],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.getListActivityLastMonth({
						page: page,
						pageSize: pageSize,
						keyword: '',
						status: STATUS_CONFIG.ACTIVE,
						state: null,
						month: month == 12 ? 1 : month! + 1,
						year: month == 12 ? year! + 1 : year!,
						projectUuid: projectUuid,
						type: 0,
					}),
				}),
			select(data) {
				return data;
			},
			enabled: !!year && !!month && !!projectUuid,
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4>Danh sách công việc tháng tới</h4>
			</div>
			<div className={styles.progress_group}>
				<WrapperScrollbar>
					<DataWrapper
						data={nextPlanReport?.items || []}
						loading={isLoading}
						noti={<Noti title='Dữ liệu trống!' des='Danh sách công việc tháng tới trống!' />}
					>
						<Table
							fixedHeader={true}
							data={nextPlanReport?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: IPlanReportOverview, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên công việc',
									render: (data: IPlanReportOverview, index: number) => (
										<Tippy content={data?.name || '---'}>
											<p className={styles.name}>{data?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Giai đoạn thực hiện',
									render: (data: IPlanReportOverview) => (
										<span style={{color: '#2970FF'}}>
											{!data?.stage && '---'}
											{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
											{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
											{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư xây dựng'}
										</span>
									),
								},
								{
									title: 'Megatype',
									render: (data: IPlanReportOverview) => <>{data?.megatype || '---'}</>,
								},
								{
									title: 'Loại công việc',
									render: (data: IPlanReportOverview) => (
										<>
											{data?.isInWorkFlow && 'Có kế hoạch'}
											{!data?.isInWorkFlow && 'Phát sinh'}
										</>
									),
								},
								{
									title: 'Trạng thái',
									fixedRight: true,
									render: (data: IPlanReportOverview) => (
										<StateActive
											stateActive={data?.state}
											listState={[
												{
													state: STATE_REPORT_WORK.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#F37277',
												},
												{
													state: STATE_REPORT_WORK.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#4BC9F0',
												},
												{
													state: STATE_REPORT_WORK.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#06D7A0',
												},
											]}
										/>
									),
								},
								{
									title: 'Tình trạng',
									render: (data: IPlanReportOverview) => (
										<StateActive
											isBox={false}
											stateActive={data?.deadlineStage}
											listState={[
												{
													state: STATE_COMPLETE_REPORT.NOT_DONE,
													text: 'Chưa thực hiện',
													textColor: '#FF852C',
													backgroundColor: '#FF852C',
												},
												{
													state: STATE_COMPLETE_REPORT.ON_SCHEDULE,
													text: 'Đúng tiến độ',
													textColor: '#005994',
													backgroundColor: '#005994',
												},
												{
													state: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
													text: 'Chậm tiến độ',
													textColor: '#EE464C',
													backgroundColor: '#EE464C',
												},
											]}
										/>
									),
								},
							]}
						/>
					</DataWrapper>
					<Pagination
						currentPage={page}
						onSetPage={setPage}
						pageSize={pageSize}
						onSetpageSize={setPageSize}
						total={nextPlanReport?.pagination?.totalCount}
						dependencies={[pageSize, year, month, projectUuid]}
					/>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default PlanReportOverview;
