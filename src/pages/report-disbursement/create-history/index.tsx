import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateReportDisbursementHistory from '~/components/pages/report-disbursement/MainCreateReportDisbursementHistory';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Giải ngân quá khứ</title>
				<meta name='description' content='Giải ngân quá khứ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateReportDisbursementHistory />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Giải ngân quá khứ'>{Page}</BaseLayout>;
};
