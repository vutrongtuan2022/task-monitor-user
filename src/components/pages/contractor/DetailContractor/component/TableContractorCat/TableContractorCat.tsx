import React from 'react';
import {useRouter} from 'next/router';
import styles from './TableContractorCat.module.scss';
import clsx from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
function TableContractorCat() {
	const router = useRouter();
	const {_page, _pageSize, _uuid} = router.query;
	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách nhóm nhà thầu</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={
						// listContractFund?.items ||
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					}
					// loading={listContractFund?.isLoading}
					noti={<Noti title='Danh sách nhóm nhà thầu trống!' des='Hiện tại chưa có thông tin nhóm nhà thầu nào!' />}
				>
					<Table
						fixedHeader={true}
						data={
							// listContractFund?.items ||
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
						}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tên  nhà thầu',
								render: (data: any) => <>{'Công ty cổ phần Sunny34'}</>,
							},

							{
								title: 'Thuộc nhóm nhà thầu',
								render: (data: any) => <>{'thiết kế'}</>,
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={100}
					dependencies={[_pageSize, _uuid]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default TableContractorCat;
