import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCreateTask from '~/components/pages/task/MainCreateTask';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới quy trình</title>
				<meta name='description' content='Thêm mới quy trình' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCreateTask />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm mới quy trình'>{Page}</BaseLayout>;
};
