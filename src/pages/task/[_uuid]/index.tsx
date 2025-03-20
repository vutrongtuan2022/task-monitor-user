import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainDetailTask from '~/components/pages/task/MainDetailTask';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết quy trình</title>
				<meta name='description' content='Chi tiết quy trình' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainDetailTask />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chi tiết quy trình'>{Page}</BaseLayout>;
};
