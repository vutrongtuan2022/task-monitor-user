import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageContractor from '~/components/pages/contractor/MainPageContractor';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý nhà thầu</title>
				<meta name='description' content='Quản lý nhà thầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageContractor />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý nhà thầu'>{Page}</BaseLayout>;
};
