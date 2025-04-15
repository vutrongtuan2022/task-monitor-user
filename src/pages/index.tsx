import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageProject from '~/components/pages/project/MainPageProject';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Dự án của bạn</title>
				<meta name='description' content='Dự án của bạn vietinbank' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageProject />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Dự án của bạn'>{Page}</BaseLayout>;
};
