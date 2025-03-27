import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPagePaymentApproval from '~/components/pages/payment-approval/MainPagePaymentApproval';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách cấp số chấp thuận thanh toán</title>
				<meta name='description' content='Danh sách cấp số chấp thuận thanh toán' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPagePaymentApproval />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách cấp số chấp thuận thanh toán'>{Page}</BaseLayout>;
};
