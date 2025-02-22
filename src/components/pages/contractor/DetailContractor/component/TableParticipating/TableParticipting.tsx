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
import {PropsTableParticipating} from './interface';
import {useRouter} from 'next/router';
function TableParticipating({}: PropsTableParticipating) {
	const router = useRouter();
	const {_page, _pageSize, _uuid} = router.query;
	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách dự án</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={
						// listContractFund?.items ||
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					}
					// loading={listContractFund?.isLoading}
					noti={<Noti title='Danh sách dự án trống!' des='Hiện tại chưa có thông tin dự án nào!' />}
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
								title: 'Tên dự án',
								render: (data: any) => (
									<>
										{data?.releasedMonth && data?.releasedYear
											? `Tháng ${data?.releasedMonth} - ${data?.releasedYear}`
											: !data?.releasedMonth && data?.releasedYear
											? `Năm ${data?.releasedYear}`
											: '---'}
									</>
								),
							},

							// {
							// 	title: 'Người tạo',
							// 	render: (data: any) => <>{data?.creator?.fullname}</>,
							// },
							{
								title: 'Ngày tham gia',
								render: (data: any) => (
									<p>{data?.releasedDate ? <Moment date={data?.releasedDate} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},

							{
								title: 'Trạng thái',
								render: (data: any) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: 1,
												text: 'Bị từ chối',
												textColor: '#FFFFFF',
												backgroundColor: '#F37277',
											},
											{
												state: 2,
												text: 'Đã báo cáo',
												textColor: '#FFFFFF',
												backgroundColor: '#4BC9F0',
											},
											{
												state: 3,
												text: 'Đã duyệt',
												textColor: '#FFFFFF',
												backgroundColor: '#06D7A0',
											},
											{
												state: 4,
												text: 'Chưa báo cáo',
												textColor: '#FFFFFF',
												backgroundColor: '#FF852C',
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
					total={100}
					dependencies={[_pageSize, _uuid]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default TableParticipating;
