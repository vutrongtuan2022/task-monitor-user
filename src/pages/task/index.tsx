import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageTask from '~/components/pages/task/MainPageTask';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý quy trình</title>
				<meta name='description' content='Quản lý quy trình' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageTask />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý quy trình'>{Page}</BaseLayout>;
};
