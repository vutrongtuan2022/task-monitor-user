import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateReportDisbursement from '~/components/pages/report-disbursement/MainCreateReportDisbursement';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm báo cáo giải ngân</title>
				<meta name='description' content='Thêm báo cáo giải ngân' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateReportDisbursement />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm báo cáo giải ngân'>{Page}</BaseLayout>;
};
