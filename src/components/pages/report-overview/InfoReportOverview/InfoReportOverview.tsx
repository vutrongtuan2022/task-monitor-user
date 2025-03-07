import React, {Fragment} from 'react';

import {PropsInfoReportOverview} from './interfaces';
import styles from './InfoReportOverview.module.scss';
import TabNavLink from '~/components/common/TabNavLink';
import {PATH} from '~/constants/config';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import ProjectReportOverview from '../MainCreateReportOverview/components/ProjectReportOverview';
import WorkReportOverview from '../MainCreateReportOverview/components/WorkReportOverview';
import DisbursementReportOverview from '../MainCreateReportOverview/components/DisbursementReportOverview';
import TableContracfund from '../MainCreateReportOverview/components/TableContracfund';
import PlanReportOverview from '../MainCreateReportOverview/components/PlanReportOverview';

function InfoReportOverview({index, year, month, projectUuid}: PropsInfoReportOverview) {
	const router = useRouter();

	const query = router.query;

	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.main_tab}>
				<TabNavLink
					query={`_type_${index}`}
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
				<div className={styles.line}></div>
				<div className={styles.main_table}>
					{!query?.[`_type_${index}`] && <ProjectReportOverview projectUuid={projectUuid} />}
					{query?.[`_type_${index}`] == 'work' && <WorkReportOverview month={month} year={year} projectUuid={projectUuid} />}
					{query?.[`_type_${index}`] == 'disbursement' && (
						<Fragment>
							<DisbursementReportOverview month={month} year={year} projectUuid={projectUuid} />
							<TableContracfund month={month} year={year} projectUuid={projectUuid} />
						</Fragment>
					)}
					{query?.[`_type_${index}`] == 'plan' && <PlanReportOverview month={month} year={year} projectUuid={projectUuid} />}
				</div>
			</div>
		</div>
	);
}

export default InfoReportOverview;
