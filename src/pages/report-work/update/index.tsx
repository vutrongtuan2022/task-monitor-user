import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUpdateReportWork from '~/components/pages/report-work/MainUpdateReportWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa báo cáo công việc</title>
				<meta name='description' content='Chỉnh sửa báo cáo công việc' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUpdateReportWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa báo cáo công việc'>{Page}</BaseLayout>;
};
