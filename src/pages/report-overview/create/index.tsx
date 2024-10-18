import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateReportOverview from '~/components/pages/report-overview/MainCreateReportOverview';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm báo cáo tổng hợp</title>
				<meta name='description' content='Thêm báo cáo tổng hợp' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateReportOverview />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm báo cáo tổng hợp'>{Page}</BaseLayout>;
};
