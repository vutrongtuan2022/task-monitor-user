import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUpdateReportDisbursement from '~/components/pages/report-disbursement/MainUpdateReportDisbursement';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa báo cáo giải ngân</title>
				<meta name='description' content='Chỉnh sửa báo cáo giải ngân' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUpdateReportDisbursement />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa báo cáo giải ngân'>{Page}</BaseLayout>;
};
