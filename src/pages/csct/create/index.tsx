import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateCSCT from '~/components/pages/csct/MainCreateCSCT';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới CSCT thanh toán</title>
				<meta name='description' content='Thêm mới CSCT thanh toán' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateCSCT />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm mới CSCT thanh toán'>{Page}</BaseLayout>;
};
