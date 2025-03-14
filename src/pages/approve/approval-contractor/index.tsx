import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageApprovalContractor from '~/components/pages/approve/MainPageApprovalContractor';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Duyệt yêu cầu</title>
				<meta name='description' content='Duyệt yêu cầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageApprovalContractor />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Duyệt yêu cầu'>{Page}</BaseLayout>;
};
