import React, {useContext} from 'react';

import {IReportWorkLastMonth, PropsTableWorkLastMonthUpdate} from './interfaces';
import styles from './TableWorkLastMonthUpdate.module.scss';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_WORK, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import StateActive from '~/components/common/StateActive';
import Tippy from '@tippyjs/react';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {IUpdateReportWork, UpdateReportWork} from '../../context';

function TableWorkLastMonthUpdate({}: PropsTableWorkLastMonthUpdate) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _state, _uuid} = router.query;

	const {month, year, projectUuid} = useContext<IUpdateReportWork>(UpdateReportWork);

	const {data: listReportLastMonth, isFetching} = useQuery(
		[QUERY_KEY.table_list_report_work_last_month, _page, _pageSize, _keyword, _state, projectUuid, month, year, _uuid],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.getListActivityLastMonth({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						state: !!_state ? Number(_state) : null,
						projectUuid: projectUuid,
						type: 0,
						reportUuid: (_uuid as string) || '',
						month: month! - 1 == 0 ? 12 : month! - 1,
						year: month! - 1 == 0 ? year! - 1 : year!,
					}),
				}),
			select(data) {
				return data;
			},
			enabled: !!projectUuid && !!month && !!year && !!_uuid,
		}
	);

	return (
		<div className={styles.main_table}>
			<div className={styles.main_search}>
				<div className={styles.search}>
					<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
				</div>
				<div className={styles.filter}>
					<FilterCustom
						isSearch
						name='Trạng thái'
						query='_state'
						listFilter={[
							{
								id: STATE_WORK.NOT_PROCESSED,
								name: 'Chưa xử lý',
							},
							{
								id: STATE_WORK.PROCESSING,
								name: 'Đang xử lý',
							},
							{
								id: STATE_WORK.COMPLETED,
								name: 'Đã hoàn thành',
							},
							{
								id: STATE_WORK.REJECTED,
								name: 'Bị từ chối',
							},
							{
								id: STATE_WORK.APPROVED,
								name: 'Đã được duyệt',
							},
						]}
					/>
				</div>
			</div>
			<DataWrapper
				data={listReportLastMonth?.items || []}
				loading={isFetching}
				noti={<Noti title='Dữ liệu trống!' des='Danh sách báo cáo tháng trước trống!' />}
			>
				<Table
					data={listReportLastMonth?.items || []}
					column={[
						{
							title: 'STT',
							render: (data: IReportWorkLastMonth, index: number) => (
								<p style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>{index + 1}</p>
							),
						},
						{
							title: 'Tên công việc',
							render: (data: IReportWorkLastMonth, index: number) => (
								<Tippy content={data?.name || '---'}>
									<p
										style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}
										className={styles.name}
									>
										{data?.name || '---'}
									</p>
								</Tippy>
							),
						},
						{
							title: 'Giai đoạn thực hiện',
							render: (data: IReportWorkLastMonth) => (
								<span style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
									{!data?.stage && '---'}
									{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
									{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
									{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư xây dựng'}
								</span>
							),
						},
						{
							title: 'Megatype',
							render: (data: IReportWorkLastMonth) => (
								<p style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
									{data?.megatype || '---'}
								</p>
							),
						},
						{
							title: 'Loại công việc',
							render: (data: IReportWorkLastMonth) => (
								<p style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
									{data?.isWorkFlow === 1 && 'Có kế hoạch'}
									{data?.isWorkFlow === 0 && 'Phát sinh'}
								</p>
							),
						},
						{
							title: 'Trạng thái',
							fixedRight: true,
							render: (data: IReportWorkLastMonth) => (
								<div style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
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
											{
												state: STATE_WORK.APPROVED,
												text: 'Đã được duyệt',
												textColor: '#FFFFFF',
												backgroundColor: '#06D7A0',
											},
										]}
									/>
								</div>
							),
						},
						{
							title: 'Tình trạng',
							render: (data: IReportWorkLastMonth) => (
								<div style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
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
								</div>
							),
						},
						{
							title: 'Số hóa',
							render: (data: IReportWorkLastMonth) => (
								<span style={{color: data?.megatype == 'Task' ? '#2970FF' : data?.megatype ? '' : ''}}>
									{data?.digitalization == 0 && 'Chưa số hóa'}
									{data?.digitalization == 1 && 'Đã số hóa'}
								</span>
							),
						},
					]}
				/>
			</DataWrapper>
			<Pagination
				currentPage={Number(_page) || 1}
				pageSize={Number(_pageSize) || 10}
				total={listReportLastMonth?.pagination?.totalCount}
				dependencies={[_pageSize, _keyword, _state, projectUuid, month, year, _uuid]}
			/>
		</div>
	);
}

export default TableWorkLastMonthUpdate;
