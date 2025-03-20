import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageApprove from '~/components/pages/approve/MainPageApprove';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Duyệt yêu cầu</title>
				<meta name='description' content='Duyệt yêu cầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageApprove />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Duyệt yêu cầu'>{Page}</BaseLayout>;
};
