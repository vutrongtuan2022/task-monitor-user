import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateReportWork from '~/components/pages/report-work/MainCreateReportWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm báo cáo công việc</title>
				<meta name='description' content='Thêm báo cáo công việc' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateReportWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm báo cáo công việc'>{Page}</BaseLayout>;
};
