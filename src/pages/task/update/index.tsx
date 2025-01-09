import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUpdateTask from '~/components/pages/task/MainUpdateTask';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa quy trình</title>
				<meta name='description' content='Chỉnh sửa quy trình' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUpdateTask />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa quy trình'>{Page}</BaseLayout>;
};
