import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUpdateReportDisbursementHistory from '~/components/pages/report-disbursement/MainUpdateReportDisbursementHistory';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Cập nhật giải ngân quá khứ</title>
				<meta name='description' content='Cập nhật giải ngân quá khứ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUpdateReportDisbursementHistory />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Cập nhật giải ngân quá khứ'>{Page}</BaseLayout>;
};
