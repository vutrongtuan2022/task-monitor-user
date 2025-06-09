import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUpdateCSCT from '~/components/pages/csct/MainUpdateCSCT';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa CSCT thanh toán</title>
				<meta name='description' content='Chỉnh sửa CSCT thanh toán' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUpdateCSCT />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa CSCT thanh toán'>{Page}</BaseLayout>;
};
