import React, {useState} from 'react';

import {IWorkReportOverview, PropsWorkReportOverview} from './interfaces';
import styles from './WorkReportOverview.module.scss';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_WORK, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import StateActive from '~/components/common/StateActive';
import Pagination from '~/components/common/Pagination';
import activityServices from '~/services/activityServices';

function WorkReportOverview({month, year, projectUuid}: PropsWorkReportOverview) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);

	const {data: activityOverview, isLoading} = useQuery([QUERY_KEY.table_work_report_overview, page, pageSize, year, month, projectUuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.getListActivityLastMonth({
					page: page,
					pageSize: pageSize,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					state: null,
					month: month!,
					year: year!,
					projectUuid: projectUuid,
					reportUuid: '',
					type: 1,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!year && !!month && !!projectUuid,
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4>Danh sách công việc</h4>
			</div>
			<div className={styles.progress_group}>
				<WrapperScrollbar>
					<DataWrapper
						data={activityOverview?.items || []}
						loading={isLoading}
						noti={<Noti title='Dữ liệu trống!' des='Danh sách công việc trống!' />}
					>
						<Table
							fixedHeader={true}
							data={activityOverview?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: IWorkReportOverview, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên công việc',
									render: (data: IWorkReportOverview) => (
										<Tippy content={data?.name || '---'}>
											<p className={styles.name}>{data?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Giai đoạn thực hiện',
									render: (data: IWorkReportOverview) => (
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
									render: (data: IWorkReportOverview) => <>{data?.megatype || '---'}</>,
								},
								{
									title: 'Loại công việc',
									render: (data: IWorkReportOverview) => (
										<>
											{data?.isWorkFlow === 1 && 'Có kế hoạch'}
											{data?.isWorkFlow === 0 && 'Phát sinh'}
										</>
									),
								},
								{
									title: 'Trạng thái',
									fixedRight: true,
									render: (data: IWorkReportOverview) => (
										<StateActive
											stateActive={data?.state}
											listState={[
												{
													state: STATE_WORK.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#FDAD73',
												},
												{
													state: STATE_WORK.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#5B70B3',
												},
												{
													state: STATE_WORK.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#16C1F3',
												},
												{
													state: STATE_WORK.REJECTED,
													text: 'Bị từ chối',
													textColor: '#FFFFFF',
													backgroundColor: '#EE464C',
												},
											]}
										/>
									),
								},
								{
									title: 'Khó khăn vướng mắc',
									render: (data: IWorkReportOverview) => (
										<p style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
											{data?.issue || '---'}
										</p>
									),
								},
								{
									title: 'Tình trạng xử lý',
									render: (data: IWorkReportOverview) => (
										<p style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
											{data?.unfinishReason == null ? '---' : data?.unfinishReason}
										</p>
									),
								},
								{
									title: 'Tình trạng',
									render: (data: IWorkReportOverview) => (
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
								// {
								// 	title: 'Số hóa',
								// 	render: (data: IWorkReportOverview) => (
								// 		<>
								// 			<p>{data?.digitalization == 0 && 'Chưa số hóa'}</p>
								// 			<p>{data?.digitalization == 1 && 'Đã số hóa'}</p>
								// 		</>
								// 	),
								// },
							]}
						/>
					</DataWrapper>
					<Pagination
						currentPage={page}
						onSetPage={setPage}
						pageSize={pageSize}
						onSetpageSize={setPageSize}
						total={activityOverview?.pagination?.totalCount}
						dependencies={[pageSize, year, month, projectUuid]}
					/>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default WorkReportOverview;
