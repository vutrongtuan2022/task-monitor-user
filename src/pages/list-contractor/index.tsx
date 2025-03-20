import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageListContractor from '~/components/pages/list-contractor/MainPageListContractor';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách nhà thầu</title>
				<meta name='description' content='Danh sách nhà thầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageListContractor />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách nhà thầu'>{Page}</BaseLayout>;
};
