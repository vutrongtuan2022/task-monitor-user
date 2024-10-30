import React, {useContext} from 'react';

import {IReportWorkLastMonth, PropsTableReportWorkLastMonth} from './interfaces';
import styles from './TableReportWorkLastMonth.module.scss';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT_WORK, STATE_WORK_PROJECT, STATUS_CONFIG} from '~/constants/config/enum';
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
import Progress from '~/components/common/Progress';
import {CreateReportWork, ICreateReportWork} from '../context';

function TableReportWorkLastMonth({}: PropsTableReportWorkLastMonth) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _state} = router.query;

	const {month, year, projectUuid} = useContext<ICreateReportWork>(CreateReportWork);

	const {data: listReportLastMonth, isFetching} = useQuery(
		[QUERY_KEY.table_list_report_work_last_month, _page, _pageSize, _keyword, _state, projectUuid, month, year],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.getListActivityLastMonth({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						state: !!_state ? Number(_state) : null,
						projectUuid: projectUuid,
						type: 0,
						month: month! - 1 == 0 ? 12 : month! - 1,
						year: month! - 1 == 0 ? year! - 1 : year!,
					}),
				}),
			select(data) {
				return data;
			},
			enabled: !!projectUuid && !!month && !!year,
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
								id: STATE_WORK_PROJECT.NOT_PROCESSED,
								name: 'Chưa xử lý',
							},
							{
								id: STATE_WORK_PROJECT.PROCESSING,
								name: 'Đang xử lý',
							},
							{
								id: STATE_WORK_PROJECT.COMPLETED,
								name: 'Đã hoàn thành',
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
							render: (data: IReportWorkLastMonth, index: number) => <>{index + 1}</>,
						},
						{
							title: 'Tên công việc',
							render: (data: IReportWorkLastMonth, index: number) => (
								<Tippy content={data?.name || '---'}>
									<p className={styles.name}>{data?.name || '---'}</p>
								</Tippy>
							),
						},
						{
							title: 'Giai đoạn thực hiện',
							render: (data: IReportWorkLastMonth) => (
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
							render: (data: IReportWorkLastMonth) => <>{data?.megatype || '---'}</>,
						},
						{
							title: 'Loại công việc',
							render: (data: IReportWorkLastMonth) => (
								<>
									{data?.isWorkFlow === 1 && 'Có kế hoạch'}
									{data?.isWorkFlow === 0 && 'Phát sinh'}
								</>
							),
						},
						{
							title: 'Trạng thái',
							fixedRight: true,
							render: (data: IReportWorkLastMonth) => (
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
							render: (data: IReportWorkLastMonth) => (
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
						{
							title: 'Số hóa',
							render: (data: IReportWorkLastMonth) => (
								<>
									<p style={{color: '#EE464C'}}>{data?.digitalization == 0 && 'Chưa số hóa'}</p>
									<p style={{color: '#2970FF'}}>{data?.digitalization == 1 && 'Đã số hóa'}</p>
								</>
							),
						},
					]}
				/>
			</DataWrapper>
			<Pagination
				currentPage={Number(_page) || 1}
				pageSize={Number(_pageSize) || 20}
				total={listReportLastMonth?.pagination?.totalCount}
				dependencies={[_pageSize, _keyword, _state, projectUuid]}
			/>
		</div>
	);
}

export default TableReportWorkLastMonth;
