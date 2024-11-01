import React, {useContext} from 'react';

import {IDisbursementReportOverview, PropsDisbursementReportOverview} from './interfaces';
import styles from './DisbursementReportOverview.module.scss';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_REPORT_DISBURSEMENT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import StateActive from '~/components/common/StateActive';
import GridColumn from '~/components/layouts/GridColumn';
import {convertCoin} from '~/common/funcs/convertCoin';
import Progress from '~/components/common/Progress';
import Moment from 'react-moment';
import {CreateReportOverview, ICreateReportOverview} from '../../context';
import projectFundServices from '~/services/projectFundServices';

function DisbursementReportOverview({}: PropsDisbursementReportOverview) {
	const {year, month, projectUuid} = useContext<ICreateReportOverview>(CreateReportOverview);

	const {data: disbursementReportOverview} = useQuery<IDisbursementReportOverview>(
		[QUERY_KEY.detail_disbursement_report_overview, year, month, projectUuid],
		{
			queryFn: () =>
				httpRequest({
					http: projectFundServices.getProjectFundOverviewReport({
						year: year!,
						month: month!,
						projectUuid: projectUuid,
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
				<h4>Thông tin chi tiết</h4>
				<div className={styles.state}>
					<p>Trạng thái giải ngân:</p>
					<StateActive
						stateActive={disbursementReportOverview?.approved!}
						listState={[
							{
								state: STATE_REPORT_DISBURSEMENT.REJECTED,
								text: 'Bị từ chối',
								textColor: '#FFFFFF',
								backgroundColor: '#F37277',
							},
							{
								state: STATE_REPORT_DISBURSEMENT.NOT_APPROVED,
								text: 'Chưa xử lý',
								textColor: '#FFFFFF',
								backgroundColor: '#4BC9F0',
							},
							{
								state: STATE_REPORT_DISBURSEMENT.APPROVED,
								text: 'Đã duyệt',
								textColor: '#FFFFFF',
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
						<p>{disbursementReportOverview?.project?.name || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Báo cáo tháng</p>
						<p>{disbursementReportOverview?.monthReport || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Số tiền giải ngân (VND)</p>
						<p>{convertCoin(disbursementReportOverview?.realeaseBudget!) || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Tổng mức đầu tư (VND)</p>
						<p>{convertCoin(disbursementReportOverview?.totalInvest!) || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Kế hoạch vốn năm (VND)</p>
						<p>{convertCoin(disbursementReportOverview?.annualBudget!) || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Lũy kế theo năm (VND)</p>
						<p>{convertCoin(disbursementReportOverview?.annualAccumAmount!) || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Lũy kế theo dự án (VND)</p>
						<p>{convertCoin(disbursementReportOverview?.projectAccumAmount!) || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Tỷ lệ giải ngân</p>
						<p>
							<Progress percent={disbursementReportOverview?.fundProgress!} width={80} />
						</p>
					</div>
					<div className={styles.item}>
						<p>Ngày gửi báo cáo</p>
						<p>
							{disbursementReportOverview?.created ? (
								<Moment date={disbursementReportOverview?.created} format='DD/MM/YYYY' />
							) : (
								'---'
							)}
						</p>
					</div>
					<div className={styles.item}>
						<p>Mô tả</p>
						<p>{disbursementReportOverview?.note || '---'}</p>
					</div>
					{disbursementReportOverview?.approved == STATE_REPORT_DISBURSEMENT.REJECTED && (
						<div className={styles.item}>
							<p>Lý do từ chối báo cáo giải ngân</p>
							<p>{disbursementReportOverview?.feedback || '---'}</p>
						</div>
					)}
				</GridColumn>
			</div>
		</div>
	);
}

export default DisbursementReportOverview;
