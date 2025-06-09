import React from 'react';

import {ICSCT, PropsMainPageCSCT} from './interfaces';
import styles from './MainPageCSCT.module.scss';
import Search from '~/components/common/Search';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CSCT} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import FilterCustom from '~/components/common/FilterCustom';
import Image from 'next/image';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import {PATH} from '~/constants/config';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import StateActive from '~/components/common/StateActive';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Moment from 'react-moment';
import Progress from '~/components/common/Progress';

function MainPageCSCT({}: PropsMainPageCSCT) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _status} = router.query;

	const listCSCT = useQuery([QUERY_KEY.table_CSCT, _page, _pageSize, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				http: pnServices.listPN({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: !!_status ? Number(_status) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo nhà thầu' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: STATUS_CSCT.NUMBER_ISSUED,
									name: 'CSCTTT đã cấp số',
								},
								{
									id: STATUS_CSCT.PENDING_APPROVAL,
									name: 'CSCTTT chờ phê duyệt',
								},
								{
									id: STATUS_CSCT.APPROVED,
									name: 'CSCTTT đã phê duyệt',
								},
								{
									id: STATUS_CSCT.REJECTED,
									name: 'CSCTTT bị từ chối',
								},
							]}
						/>
					</div>
				</div>
				<div className={styles.btn}>
					<Button
						p_10_24
						rounded_8
						light-blue
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						href={PATH.CSCTCreate}
					>
						Thêm mới
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listCSCT?.data?.items || []}
					loading={listCSCT.isLoading}
					noti={
						<Noti
							title='Danh sách CSCT thanh toán trống!'
							des='Hiện tại chưa có thông tin CSCT thanh toán nào!'
							button={
								<Button
									p_10_24
									rounded_8
									light-blue
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
									href={PATH.CSCTCreate}
								>
									Thêm mới
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listCSCT?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ICSCT, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã cấp số',
								fixedLeft: true,
								render: (data: ICSCT) => (
									<Tippy content='Xem chi tiết'>
										<Link href={`${PATH.CSCT}?_uuid=${data?.uuid}`} className={styles.link}>
											{data?.code}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày lấy số',
								render: (data: ICSCT) => <>{data?.created ? <Moment date={data?.created} format='DD/MM/YYYY' /> : '---'}</>,
							},
							{
								title: 'Tên dự án',
								render: (data: ICSCT) => <p className={styles.name}>{data?.name}</p>,
							},
							{
								title: 'SL hợp đồng',
								render: (data: ICSCT) => <p className={styles.name}>{data?.name}</p>,
							},
							{
								title: 'Tống giá trị thanh toán (VND)',
								render: (data: ICSCT) => <>100</>,
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: ICSCT) => <>----</>,
							},
							{
								title: 'Cán bộ chuyên quản',
								render: (data: ICSCT) => <>----</>,
							},
							{
								title: 'Tiến độ giải ngân',
								render: (data: ICSCT) => <Progress percent={100} width={80} />,
							},
							{
								title: 'Trạng thái',
								render: (data: ICSCT) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATUS_CSCT.NUMBER_ISSUED,
												text: 'CSCTTT đã cấp số',
												textColor: '#fff',
												backgroundColor: '#005994',
											},
											{
												state: STATUS_CSCT.PENDING_APPROVAL,
												text: 'CSCTTT chờ phê duyệt',
												textColor: '#fff',
												backgroundColor: '#FDAD73',
											},
											{
												state: STATUS_CSCT.APPROVED,
												text: 'CSCTTT đã phê duyệt',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: STATUS_CSCT.REJECTED,
												text: 'CSCTTT bị từ chối',
												textColor: '#fff',
												backgroundColor: '#EE464C',
											},
										]}
									/>
								),
							},
							// {
							// 	title: 'Hành động',
							// 	fixedRight: true,
							// 	render: (data: ICSCT) => (
							// 		<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
							// 			<IconCustom
							// 				type='edit'
							// 				icon={<Edit fontSize={20} fontWeight={600} />}
							// 				tooltip='Chỉnh sửa'
							// 				disnable={data?.state == STATE_PROJECT.FINISH}
							// 				href={`${PATH.UpdateInfoProject}?_uuid=${data?.uuid}`}
							// 			/>
							// 			<IconCustom
							// 				type='delete'
							// 				icon={<Trash fontSize={20} fontWeight={600} />}
							// 				tooltip='Xóa bỏ'
							// 				disnable={data?.state == STATE_PROJECT.DO || data?.state == STATE_PROJECT.FINISH}
							// 				onClick={() => {
							// 					setDeleteProject(data);
							// 				}}
							// 			/>
							// 		</div>
							// 	),
							// },
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listCSCT?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _status]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageCSCT;
