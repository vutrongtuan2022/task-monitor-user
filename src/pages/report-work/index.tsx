import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageReportWork from '~/components/pages/report-work/MainPageReportWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách kế hoạch tháng</title>
				<meta name='description' content='Danh sách kế hoạch tháng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageReportWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách kế hoạch tháng'>{Page}</BaseLayout>;
};
