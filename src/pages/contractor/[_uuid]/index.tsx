import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import DetailContractor from '~/components/pages/contractor/DetailContractor';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết nhà thầu</title>
				<meta name='description' content='Chi tiết nhà thầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<DetailContractor />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chi tiết nhà thầu'>{Page}</BaseLayout>;
};
