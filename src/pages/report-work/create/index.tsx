import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateReportWork from '~/components/pages/report-work/MainCreateReportWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Tạo kế hoạch công việc tháng</title>
				<meta name='description' content='Tạo kế hoạch công việc tháng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateReportWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Tạo kế hoạch công việc tháng'>{Page}</BaseLayout>;
};
