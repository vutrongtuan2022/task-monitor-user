import React from 'react';

import {IDetailProjectFund, PropsDetailReportDisbursement} from './interfaces';
import styles from './DetailReportDisbursement.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import Moment from 'react-moment';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_REPORT_DISBURSEMENT} from '~/constants/config/enum';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import projectFundServices from '~/services/projectFundServices';
import {convertCoin} from '~/common/funcs/convertCoin';
import Progress from '~/components/common/Progress';

function DetailReportDisbursement({}: PropsDetailReportDisbursement) {
	const router = useRouter();
	const {_id} = router.query;

	const {data: detailProjectFund} = useQuery<IDetailProjectFund>([QUERY_KEY.detail_report_disbursement, _id], {
		queryFn: () =>
			httpRequest({
				http: projectFundServices.detailProjectFund({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportDisbursement,
						title: 'Danh sách báo cáo giải ngân',
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
							<p>Trạng thái giải ngân:</p>
							<StateActive
								stateActive={detailProjectFund?.approved!}
								listState={[
									{
										state: STATE_REPORT_DISBURSEMENT.REJECTED,
										text: 'Bị từ chối',
										textColor: '#FFFFFF',
										backgroundColor: '#F37277',
									},
									{
										state: STATE_REPORT_DISBURSEMENT.NOT_APPROVED,
										text: 'Đã báo cáo',
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
								<p>{detailProjectFund?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Báo cáo tháng</p>
								<p>{detailProjectFund?.monthReport || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Người gửi báo cáo</p>
								<p>{detailProjectFund?.reporter?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Số tiền giải ngân (VND)</p>
								<p>{convertCoin(detailProjectFund?.realeaseBudget!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tổng mức đầu tư (VND)</p>
								<p>{convertCoin(detailProjectFund?.totalInvest!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Kế hoạch vốn năm (VND)</p>
								<p>{convertCoin(detailProjectFund?.annualBudget!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế theo năm (VND)</p>
								<p>{convertCoin(detailProjectFund?.annualAccumAmount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế theo dự án (VND)</p>
								<p>{convertCoin(detailProjectFund?.projectAccumAmount!) || '---'} </p>
							</div>
							<div className={styles.item}>
								<p>Tỷ lệ giải ngân</p>
								<p>
									<Progress percent={detailProjectFund?.fundProgress!} width={80} />
								</p>
							</div>
							<div className={styles.item}>
								<p>Ngày gửi báo cáo</p>
								<p>
									<Moment date={detailProjectFund?.created} format='DD/MM/YYYY' />
								</p>
							</div>
							<div className={styles.item}>
								<p>Mô tả</p>
								<p>{detailProjectFund?.note || '---'}</p>
							</div>
							{detailProjectFund?.approved === STATE_REPORT_DISBURSEMENT.REJECTED && (
								<div className={styles.item}>
									<p>Lý do từ chối báo cáo giải ngân</p>
									<p>{detailProjectFund?.feedback || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailReportDisbursement;
