import React, {useState} from 'react';

import {IReportWork, PropsMainPageReportWork} from './interfaces';
import styles from './MainPageReportWork.module.scss';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import reportServices from '~/services/reportServices';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import {generateYearsArray} from '~/common/funcs/selectDate';
import StateActive from '~/components/common/StateActive';
import IconCustom from '~/components/common/IconCustom';
import {DocumentForward, Edit, Eye, Trash} from 'iconsax-react';
import Moment from 'react-moment';
import Loading from '~/components/common/Loading';
import Dialog from '~/components/common/Dialog';
import PositionContainer from '~/components/common/PositionContainer';
import TableListWorkDigitize from '../TableListWorkDigitize';
import Tippy from '@tippyjs/react';

function MainPageReportWork({}: PropsMainPageReportWork) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _state, _completeState, _uuidDigitize} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');

	const listReportWork = useQuery([QUERY_KEY.table_list_report_work, _page, _pageSize, _keyword, _year, _month, _state, _completeState], {
		queryFn: () =>
			httpRequest({
				http: reportServices.listReportUser({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: !!_state ? Number(_state) : null,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
					completeState: !!_completeState ? Number(_completeState) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDeleteReportWork = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa báo cáo thành công!',
				http: reportServices.userDeleteReport({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_report_work]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteReportWork.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công trình, ID' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Năm'
							query='_year'
							listFilter={years?.map((v) => ({
								id: v,
								name: `Năm ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tháng'
							query='_month'
							listFilter={months?.map((v) => ({
								id: v,
								name: `Tháng ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_REPORT.REJECTED,
									name: 'Bị từ chối',
								},
								{
									id: STATE_REPORT.PLANNING,
									name: 'Lên kế hoạch',
								},
								{
									id: STATE_REPORT.REPORTED,
									name: 'Đã duyệt',
								},
								{
									id: STATE_REPORT.IN_PROGRESS,
									name: 'Chưa báo cáo',
								},
								{
									id: STATE_REPORT.PENDING_APPROVAL,
									name: 'Đã báo cáo',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tình trạng'
							query='_completeState'
							listFilter={[
								{
									id: STATE_COMPLETE_REPORT.NOT_DONE,
									name: 'Chưa thực hiện',
								},
								{
									id: STATE_COMPLETE_REPORT.ON_SCHEDULE,
									name: 'Đúng tiến độ',
								},
								{
									id: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
									name: 'Chậm tiến độ',
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
						href={PATH.ReportWorkCreate}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới báo cáo
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listReportWork?.data?.items || []}
					loading={listReportWork.isLoading}
					noti={
						<Noti
							title='Dữ liệu trống!'
							des='Danh sách báo cáo công việc trống!'
							button={
								<Button
									p_10_24
									rounded_8
									light-blue
									href={PATH.ReportWorkCreate}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới báo cáo
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listReportWork?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IReportWork, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên công trình',
								render: (data: IReportWork) => (
									<Tippy content={data?.project?.name}>
										<p className={styles.name}>{data?.project?.name}</p>
									</Tippy>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IReportWork) => <>{data?.project?.leader?.fullname}</>,
							},
							{
								title: 'Số công việc thực hiện',
								render: (data: IReportWork) => (
									<p>
										<span style={{color: '#2970FF'}}>{data?.completedActivity}</span>/{' '}
										<span style={{color: '#23262F'}}>{data?.totalActivity}</span>
									</p>
								),
							},
							{
								title: 'Kế hoạch tháng',
								render: (data: IReportWork) => (
									<>
										Tháng <span>{data?.month}</span> - <span>{data?.year}</span>
									</>
								),
							},
							{
								title: 'Ngày gửi báo cáo',
								render: (data: IReportWork) => (
									<>{data?.completed ? <Moment date={data?.completed} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: IReportWork) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATE_REPORT.REJECTED,
												text: 'Bị từ chối',
												textColor: '#fff',
												backgroundColor: '#EE464C',
											},
											{
												state: STATE_REPORT.PLANNING,
												text: 'Lên kế hoạch',
												textColor: '#fff',
												backgroundColor: '#5B70B3',
											},
											{
												state: STATE_REPORT.REPORTED,
												text: 'Đã duyệt',
												textColor: '#fff',
												backgroundColor: '#16C1F3',
											},
											{
												state: STATE_REPORT.IN_PROGRESS,
												text: 'Chưa báo cáo',
												textColor: '#fff',
												backgroundColor: '#FF852C',
											},
											{
												state: STATE_REPORT.PENDING_APPROVAL,
												text: 'Đã báo cáo',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
										]}
									/>
								),
							},
							{
								title: 'Tình trạng',
								render: (data: IReportWork) => (
									<StateActive
										isBox={false}
										stateActive={data?.completeState}
										listState={[
											{
												state: STATE_COMPLETE_REPORT.NOT_DONE,
												text: 'Chưa thực hiện',
												textColor: '#FF852C',
												backgroundColor: '#FF852C',
											},
											{
												state: STATE_COMPLETE_REPORT.ON_SCHEDULE,
												text: 'Đúng tiến độ',
												textColor: '#005994',
												backgroundColor: '#005994',
											},
											{
												state: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
												text: 'Chậm tiến độ',
												textColor: '#EE464C',
												backgroundColor: '#EE464C',
											},
										]}
									/>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IReportWork) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{/* Trạng thái Đang thực hiện + Đã từ chối */}
										{data?.state == STATE_REPORT.IN_PROGRESS || data?.state == STATE_REPORT.REJECTED ? (
											<IconCustom
												color='#16C1F3'
												icon={<DocumentForward fontSize={20} fontWeight={600} />}
												tooltip='Gửi báo cáo'
												onClick={() => {
													router.replace({
														pathname: router.pathname,
														query: {
															...router.query,
															_uuidDigitize: data?.uuid,
														},
													});
												}}
											/>
										) : null}

										{/* Trạng thái Đang lên kế hoạch + Đã từ chối */}
										{data?.state == STATE_REPORT.PLANNING ||
										data?.state == STATE_REPORT.IN_PROGRESS ||
										data?.state == STATE_REPORT.REJECTED ? (
											<IconCustom
												type='edit'
												icon={<Edit fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												href={`${PATH.ReportWorkUpdate}?_uuid=${data?.uuid}`}
											/>
										) : null}

										{/* Trạng thái Đang lên kế hoạch */}
										{data?.state == STATE_REPORT.PLANNING && (
											<IconCustom
												type='delete'
												icon={<Trash fontSize={20} fontWeight={600} />}
												tooltip='Xóa bỏ'
												onClick={() => setUuidDelete(data?.uuid)}
											/>
										)}

										<IconCustom
											color='#005994'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
											href={`${PATH.ReportWork}/${data?.uuid}`}
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
					total={listReportWork?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _year, _month, _state, _completeState]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='error'
				open={!!uuidDelete}
				onClose={() => setUuidDelete('')}
				title={'Xóa báo cáo'}
				note={'Bạn có chắc chắn muốn xóa báo cáo này không?'}
				onSubmit={funcDeleteReportWork.mutate}
			/>

			<PositionContainer
				open={!!_uuidDigitize}
				onClose={() => {
					const {_uuidDigitize, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<TableListWorkDigitize
					onClose={() => {
						const {_uuidDigitize, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</div>
	);
}

export default MainPageReportWork;
