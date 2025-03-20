import React from 'react';
import {useRouter} from 'next/router';
import styles from './TableContractorCat.module.scss';
import clsx from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import contractorServices from '~/services/contractorServices';
import {QUERY_KEY} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {ITableContractorCat, PropsTableContractorCat} from './interface';
function TableContractorCat({}: PropsTableContractorCat) {
	const router = useRouter();
	const {_uuid} = router.query;
	const {data: listContractorCatByContractor} = useQuery([QUERY_KEY.table_contractor_cat_by_contractor, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.listContractorCatByContractor({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
	});
	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách nhóm nhà thầu</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractorCatByContractor || []}
					loading={listContractorCatByContractor?.isLoading}
					noti={<Noti title='Danh sách nhóm nhà thầu trống!' des='Hiện tại chưa có thông tin nhóm nhà thầu nào!' />}
				>
					<Table
						fixedHeader={true}
						data={listContractorCatByContractor || []}
						column={[
							{
								title: 'STT',
								render: (data: ITableContractorCat, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã nhóm nhà thầu',
								render: (data: ITableContractorCat) => <>{data?.code || '---'}</>,
							},

							{
								title: 'Thuộc nhóm nhà thầu',
								render: (data: ITableContractorCat) => <>{data?.name || '---'}</>,
							},
						]}
					/>
				</DataWrapper>
			</WrapperScrollbar>
		</div>
	);
}

export default TableContractorCat;
