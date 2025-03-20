import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageBranch from '~/components/pages/branch/MainPageBranch';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý chi nhánh</title>
				<meta name='description' content='Quản lý chi nhánh' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageBranch />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý chi nhánh'>{Page}</BaseLayout>;
};
