import clsx from 'clsx';
import React from 'react';
import styles from './TableParticipting.module.scss';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import StateActive from '~/components/common/StateActive';
import Pagination from '~/components/common/Pagination';
import Moment from 'react-moment';
import {ITableParticipating, PropsTableParticipating} from './interface';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_PROJECT} from '~/constants/config/enum';
import contractorServices from '~/services/contractorServices';
import {httpRequest} from '~/services';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import {PATH} from '~/constants/config';
function TableParticipating({}: PropsTableParticipating) {
	const router = useRouter();
	const {_page, _pageSize, _uuid} = router.query;
	const {data: listProjectForContractor} = useQuery([QUERY_KEY.table_project_for_contractor, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.listProjectForContractor({
					pageSize: Number(_pageSize) || 10,
					page: Number(_page) || 1,
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách dự án</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listProjectForContractor?.items || []}
					loading={listProjectForContractor?.isLoading}
					noti={<Noti title='Danh sách dự án trống!' des='Hiện tại chưa có thông tin dự án nào!' />}
				>
					<Table
						fixedHeader={true}
						data={listProjectForContractor?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ITableParticipating, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tên dự án',
								render: (data: ITableParticipating) => (
									<Tippy content='Chi tiết dự án'>
										<Link href={`${PATH.ProjectInfo}?_uuid=${data?.project?.uuid}`} className={styles.link}>
											{data?.project?.name || '---'}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày tham gia',
								render: (data: ITableParticipating) => (
									<p>{data?.created ? <Moment date={data?.created} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},

							{
								title: 'Trạng thái',
								render: (data: ITableParticipating) => (
									<StateActive
										stateActive={data?.project?.state}
										listState={[
											{
												state: STATE_PROJECT.PREPARE,
												text: 'Chuẩn bị',
												textColor: '#fff',
												backgroundColor: '#5B70B3',
											},
											{
												state: STATE_PROJECT.DO,
												text: 'Thực hiện',
												textColor: '#fff',
												backgroundColor: '#16C1F3',
											},
											{
												state: STATE_PROJECT.FINISH,
												text: 'Kết thúc',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
										]}
									/>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listProjectForContractor?.pagination?.totalCount || 0}
					dependencies={[_pageSize, _uuid]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default TableParticipating;
