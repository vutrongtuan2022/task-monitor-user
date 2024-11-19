import React, {useContext} from 'react';

import {IDisbursementReportOverview, PropsDisbursementReportOverview} from './interfaces';
import styles from './DisbursementReportOverview.module.scss';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import GridColumn from '~/components/layouts/GridColumn';
import {convertCoin} from '~/common/funcs/convertCoin';
import {CreateReportOverview, ICreateReportOverview} from '../../context';
import contractsFundServices from '~/services/contractFundServices';

function DisbursementReportOverview({}: PropsDisbursementReportOverview) {
	const {year, month, projectUuid} = useContext<ICreateReportOverview>(CreateReportOverview);

	const {data: disbursementReportOverview} = useQuery<IDisbursementReportOverview>(
		[QUERY_KEY.detail_disbursement_report_overview, year, month, projectUuid],
		{
			queryFn: () =>
				httpRequest({
					http: contractsFundServices.getContractFundForOverView({
						projectUuid: projectUuid,
						month: month!,
						year: year!,
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
			</div>
			<div className={styles.progress_group}>
				<GridColumn col_3>
					<div className={styles.item}>
						<p>Tên công trình</p>
						<p>{disbursementReportOverview?.projectDTO?.name || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Báo cáo tháng</p>
						{!!disbursementReportOverview?.month && disbursementReportOverview?.year ? (
							<p>{`Tháng ${disbursementReportOverview?.month} - ${disbursementReportOverview?.year}` || '---'}</p>
						) : (
							'---'
						)}
					</div>
					<div className={styles.item}>
						<p>Số hợp đồng giải ngân</p>
						<p>{disbursementReportOverview?.totalContracts || '---'}</p>
					</div>
					<div className={styles.item}>
						<p>Tổng số tiền đã giải ngân (VND)</p>
						<p>
							<span style={{color: '#EE464C'}}>
								{disbursementReportOverview?.totalFunds ? convertCoin(disbursementReportOverview?.totalFunds!) : '---'}
							</span>
						</p>
					</div>
				</GridColumn>
			</div>
		</div>
	);
}

export default DisbursementReportOverview;
