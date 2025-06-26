import React, {useState} from 'react';

import {ICSCT, PropsMainPageCSCT} from './interfaces';
import styles from './MainPageCSCT.module.scss';
import Search from '~/components/common/Search';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, STATUS_CSCT} from '~/constants/config/enum';
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
import IconCustom from '~/components/common/IconCustom';
import {CalendarAdd, CalendarEdit, Edit, Eye, Trash} from 'iconsax-react';
import {convertCoin} from '~/common/funcs/convertCoin';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import projectServices from '~/services/projectServices';
import Popup from '~/components/common/Popup';
import FormCreateIssue from '../FormCreateIssue';
import FormUpdateIssue from '../FormUpdateIssue';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MainPageCSCT({}: PropsMainPageCSCT) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status, _state, _project, _uuidCreateNoticeDate, _uuidUpdateNoticeDate} = router.query;
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [deleteCSCT, setDeleteCSCT] = useState<string>('');

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					excludeState: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listCSCT = useQuery([QUERY_KEY.table_CSCT, _page, _pageSize, _keyword, _status, _state, _project], {
		queryFn: () =>
			httpRequest({
				http: pnServices.listPN({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: !!_state ? Number(_state) : null,
					projectUuid: (_project as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDelete = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa CSCT thanh toán thành công!',
				http: pnServices.updateStatusPN({
					uuid: deleteCSCT,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDeleteCSCT('');
				queryClient.invalidateQueries([QUERY_KEY.table_CSCT]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcDelete.isLoading} />
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã cấp số' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
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
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Dự án'
							query='_project'
							listFilter={listProject?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
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
								render: (data: ICSCT, index: number) => <p>{index + 1}</p>,
							},
							{
								title: 'Mã cấp số',
								fixedLeft: true,
								render: (data: ICSCT, index: number) => (
									<Tippy content='Xem chi tiết'>
										<Link href={`${PATH.CSCT}/${data?.uuid}`} className={styles.link}>
											{data?.code || '---'}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày lấy số',
								render: (data: ICSCT) => (
									<p>{data?.numberingDate ? <Moment date={data?.numberingDate} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},
							{
								title: 'Tên dự án',
								render: (data: ICSCT) => <>{data?.project?.name || '---'}</>,
							},
							{
								title: 'SL hợp đồng',
								render: (data: ICSCT) => <p>{data?.totalContracts}</p>,
							},
							{
								title: 'Tổng giá trị thanh toán(VND)',
								render: (data: ICSCT) => (
									<p>
										<span>{convertCoin(data?.accumAmount)}</span>/
										<span style={{color: '#005994'}}>{convertCoin(data?.totalAmount)}</span>
									</p>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: ICSCT) => <>{data?.project?.leader?.fullname || '---'}</>,
							},
							{
								title: 'Cán bộ chuyên quản',
								render: (data: ICSCT) => <>{data?.user?.fullname || '---'}</>,
							},
							{
								title: 'Tỷ lệ giải ngân/Giá trị CSCTTT',
								render: (data: ICSCT) => <Progress percent={data?.percent} width={80} />,
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
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: ICSCT) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{infoUser?.userUuid === data?.user?.uuid ? (
											<>
												{data?.state === STATUS_CSCT.NUMBER_ISSUED ? (
													<IconCustom
														type='edit'
														icon={<CalendarAdd fontSize={20} fontWeight={600} color='#2970FF' />}
														tooltip='Thêm ngày cấp số'
														onClick={() => {
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_uuidCreateNoticeDate: data?.uuid,
																},
															});
														}}
													/>
												) : null}

												{data?.state === STATUS_CSCT.REJECTED ? (
													<IconCustom
														type='edit'
														icon={<CalendarEdit fontSize={20} fontWeight={600} color='#06D7A0' />}
														tooltip='Chỉnh sửa ngày cấp số'
														onClick={() => {
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_uuidUpdateNoticeDate: data?.uuid,
																},
															});
														}}
													/>
												) : null}

												<IconCustom
													type='edit'
													icon={<Edit fontSize={20} fontWeight={600} />}
													tooltip='Chỉnh sửa'
													disnable={data?.state == STATUS_CSCT.APPROVED}
													href={`${PATH.CSCTUpdate}?_uuid=${data?.uuid}`}
												/>
												<IconCustom
													type='delete'
													icon={<Trash fontSize={20} fontWeight={600} />}
													tooltip='Xóa bỏ'
													disnable={
														data?.state == STATUS_CSCT.APPROVED || data?.state == STATUS_CSCT.PENDING_APPROVAL
													}
													onClick={() => setDeleteCSCT(data?.uuid)}
												/>
											</>
										) : null}
										<IconCustom
											href={`${PATH.CSCT}/${data?.uuid}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listCSCT?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _status, _state, _project]}
				/>
				<Dialog
					type='error'
					open={!!deleteCSCT}
					onClose={() => setDeleteCSCT('')}
					title={'Xóa CSCT thanh toán'}
					note={'Bạn có chắc chắn muốn xóa CSCT thanh toán này không?'}
					onSubmit={funcDelete.mutate}
				/>
			</WrapperScrollbar>

			<Popup
				open={!!_uuidCreateNoticeDate}
				onClose={() => {
					const {_uuidCreateNoticeDate, ...rest} = router.query;

					router.replace(
						{
							pathname: router.pathname,
							query: {
								...rest,
							},
						},
						undefined,
						{shallow: true, scroll: false}
					);
				}}
			>
				<FormCreateIssue
					onClose={() => {
						const {_uuidCreateNoticeDate, ...rest} = router.query;

						router.replace(
							{
								pathname: router.pathname,
								query: {
									...rest,
								},
							},
							undefined,
							{shallow: true, scroll: false}
						);
					}}
				/>
			</Popup>

			<Popup
				open={!!_uuidUpdateNoticeDate}
				onClose={() => {
					const {_uuidUpdateNoticeDate, ...rest} = router.query;

					router.replace(
						{
							pathname: router.pathname,
							query: {
								...rest,
							},
						},
						undefined,
						{shallow: true, scroll: false}
					);
				}}
			>
				<FormUpdateIssue
					onClose={() => {
						const {_uuidUpdateNoticeDate, ...rest} = router.query;

						router.replace(
							{
								pathname: router.pathname,
								query: {
									...rest,
								},
							},
							undefined,
							{shallow: true, scroll: false}
						);
					}}
				/>
			</Popup>
		</div>
	);
}

export default MainPageCSCT;
