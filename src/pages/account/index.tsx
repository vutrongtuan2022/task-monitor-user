import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageAccount from '~/components/pages/account/MainPageAccount';
import MainPageUser from '~/components/pages/user/MainPageUser';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý tài khoản</title>
				<meta name='description' content='Quản lý tài khoản' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<MainPageAccount />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý tài khoản'>{Page}</BaseLayout>;
};
