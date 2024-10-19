import React from 'react';

import {IDetailReportWork, PropsDetailReportWork} from './interfaces';
import styles from './DetailReportWork.module.scss';
import {PATH} from '~/constants/config';
import Breadcrumb from '~/components/common/Breadcrumb';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';
import TableReportWorkLastMonth from './components/TableReportWorkLastMonth';
import TableReportWorkCurrent from './components/TableReportWorkCurrent';

function DetailReportWork({}: PropsDetailReportWork) {
	const router = useRouter();
	const {_uuid, _type} = router.query;

	const {data: detailReportWork} = useQuery<IDetailReportWork>([QUERY_KEY.detail_report_work, _uuid], {
		queryFn: () =>
			httpRequest({
				http: reportServices.detailReport({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách kế hoạch tháng',
					},
					{
						path: '',
						title: 'Chi tiết báo cáo',
					},
				]}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái báo cáo:</p>
							<StateActive
								stateActive={detailReportWork?.state!}
								listState={[
									{
										state: STATE_REPORT.REJECTED,
										text: 'Bị từ chối',
										textColor: '#fff',
										backgroundColor: '#EE464C',
									},
									{
										state: STATE_REPORT.PLANNING,
										text: 'Lên kế hoạch',
										textColor: '#fff',
										backgroundColor: '#5B70B3',
									},
									{
										state: STATE_REPORT.REPORTED,
										text: 'Đã duyệt',
										textColor: '#fff',
										backgroundColor: '#16C1F3',
									},
									{
										state: STATE_REPORT.IN_PROGRESS,
										text: 'Đang thực hiện',
										textColor: '#fff',
										backgroundColor: '#FF852C',
									},
									{
										state: STATE_REPORT.PENDING_APPROVAL,
										text: 'Đã báo cáo',
										textColor: '#fff',
										backgroundColor: '#06D7A0',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailReportWork?.project?.name}</p>
							</div>
							<div className={styles.item}>
								<p>Kế hoạch</p>
								<p>
									Tháng {detailReportWork?.month} - {detailReportWork?.year}
								</p>
							</div>
							<div className={styles.item}>
								<p>Tình trạng</p>
								<StateActive
									isBox={false}
									stateActive={detailReportWork?.completeState}
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
							<div className={styles.item}>
								<p>Công việc thực hiện</p>
								<p>
									<span style={{color: '#2970FF'}}>{detailReportWork?.completedActivity}</span>/
									<span>{detailReportWork?.totalActivity}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Ngày gửi báo cáo</p>
								<p>
									<Moment date={detailReportWork?.completed} format='DD/MM/YYYY' />
								</p>
							</div>
							<div className={styles.item}>
								<p>Người gửi báo cáo</p>
								<p>{detailReportWork?.reporter?.fullname}</p>
							</div>
							{detailReportWork?.state == STATE_REPORT.REJECTED && (
								<div className={styles.item}>
									<p>Lý do từ chối</p>
									<p>{detailReportWork?.note || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>

				<div className={clsx(styles.basic_info, styles.mt)}>
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
							listKeyRemove={['_page', '_pageSize', '_keyword', '_state']}
						/>
					</div>
					<div className={styles.line}></div>
					<div className={styles.head}>
						<h4>Danh sách công việc</h4>
					</div>
					<div className={styles.main_table}>
						{!_type && <TableReportWorkLastMonth />}
						{_type == 'report' && <TableReportWorkCurrent />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailReportWork;
