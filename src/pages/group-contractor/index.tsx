import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainGroupContractor from '~/components/pages/group-contractor/MainGroupContractor';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý nhóm nhà thầu</title>
				<meta name='description' content='Quản lý nhóm nhà thầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainGroupContractor />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý nhóm nhà thầu'>{Page}</BaseLayout>;
};
