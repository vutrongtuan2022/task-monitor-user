import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageWork from '~/components/pages/work/MainPageWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý công việc</title>
				<meta name='description' content='Quản lý công việc' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách công việc cần làm'>{Page}</BaseLayout>;
};
