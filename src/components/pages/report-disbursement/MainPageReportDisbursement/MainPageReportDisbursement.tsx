import React, {useState} from 'react';

import {IReportDisbursement, PropsMainPageReportDisbursement} from './interfaces';
import styles from './MainPageReportDisbursement.module.scss';
import Search from '~/components/common/Search';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, STATE_REPORT_DISBURSEMENT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';
import IconCustom from '~/components/common/IconCustom';
import {DocumentForward, Edit, Eye, Trash} from 'iconsax-react';
import Moment from 'react-moment';
import {convertCoin} from '~/common/funcs/convertCoin';
import {generateYearsArray} from '~/common/funcs/selectDate';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import contractsFundServices from '~/services/contractFundServices';
import Tippy from '@tippyjs/react';

function MainPageReportDisbursement({}: PropsMainPageReportDisbursement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _state} = router.query;

	const [uuidSendReport, setUuidSendReport] = useState<string>('');
	const [openDelete, setOpenDelete] = useState<IReportDisbursement | null>(null);

	const listUserContractFundAll = useQuery(
		[QUERY_KEY.table_list_report_disbursement, _page, _pageSize, _keyword, _state, _year, _month],
		{
			queryFn: () =>
				httpRequest({
					http: contractsFundServices.getUserContractFundPaged({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						state: !!_state ? Number(_state) : null,
						year: !!_year ? Number(_year) : null,
						month: !!_month ? Number(_month) : null,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const funcSendReport = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Gửi báo cáo thành công!',
				http: contractsFundServices.sendContractFund({
					uuid: uuidSendReport,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidSendReport('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_report_disbursement]);
			}
		},
	});

	const funcDeleteContratsFund = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa báo cáo thành công',
				http: contractsFundServices.updateStatus({
					uuid: openDelete?.uuid!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenDelete(null);
				queryClient.invalidateQueries([QUERY_KEY.table_list_report_disbursement]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcSendReport.isLoading || funcDeleteContratsFund.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công trình' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_REPORT_DISBURSEMENT.NOT_REPORT,
									name: 'Chưa báo cáo',
								},
								{
									id: STATE_REPORT_DISBURSEMENT.REPORTED,
									name: 'Đã báo cáo',
								},
								{
									id: STATE_REPORT_DISBURSEMENT.APPROVED,
									name: 'Đã duyệt',
								},
								{
									id: STATE_REPORT_DISBURSEMENT.REJECTED,
									name: 'Bị từ chối',
								},
							]}
						/>
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
				</div>
				<div className={styles.btn}>
					<div>
						<Button
							p_10_24
							rounded_8
							blueRedLinear
							href={PATH.ReportDisbursementCreateHistory}
							icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						>
							Giải ngân quá khứ
						</Button>
					</div>
					<div>
						<Button
							p_10_24
							rounded_8
							light-blue
							href={PATH.ReportDisbursementCreate}
							icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						>
							Thêm mới báo cáo
						</Button>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listUserContractFundAll?.data?.items || []}
					loading={listUserContractFundAll.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách báo cáo giải ngân trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listUserContractFundAll?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IReportDisbursement, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên công trình',
								fixedLeft: true,
								render: (data: IReportDisbursement) => (
									<Tippy content={data?.project?.name}>
										<p className={styles.name}>{data?.project?.name}</p>
									</Tippy>
								),
							},
							{
								title: 'Thời gian báo cáo',
								render: (data: IReportDisbursement) => (
									<>
										{data?.releasedMonth && data?.releasedYear
											? `Tháng ${data?.releasedMonth} - ${data?.releasedYear}`
											: !data?.releasedMonth && data?.releasedYear
											? `Năm ${data?.releasedYear}`
											: '---'}
									</>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IReportDisbursement) => <>{data?.project?.leader?.fullname}</>,
							},
							{
								title: 'Sử dụng vốn dự phòng (VND)',
								render: (data: IReportDisbursement) => <>{convertCoin(data?.reverseAmount) || '---'}</>,
							},
							{
								title: 'Sử dụng vốn dự án (VND)',
								render: (data: IReportDisbursement) => <>{convertCoin(data?.projectAmount) || '---'}</>,
							},
							{
								title: 'Kế hoạch vốn năm (VND)',
								render: (data: IReportDisbursement) => <>{convertCoin(data?.yearlyBudget) || '---'}</>,
							},
							{
								title: 'Tổng mức đầu tư (VND)',
								render: (data: IReportDisbursement) => <>{convertCoin(data?.totalBudget) || '---'}</>,
							},
							{
								title: 'Ngày gửi báo cáo',
								render: (data: IReportDisbursement) => (
									<p>{data?.sendDate ? <Moment date={data?.sendDate} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: IReportDisbursement) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATE_REPORT_DISBURSEMENT.REJECTED,
												text: 'Bị từ chối',
												textColor: '#FFFFFF',
												backgroundColor: '#F37277',
											},
											{
												state: STATE_REPORT_DISBURSEMENT.REPORTED,
												text: 'Đã báo cáo',
												textColor: '#FFFFFF',
												backgroundColor: '#4BC9F0',
											},
											{
												state: STATE_REPORT_DISBURSEMENT.APPROVED,
												text: 'Đã duyệt',
												textColor: '#FFFFFF',
												backgroundColor: '#06D7A0',
											},
											{
												state: STATE_REPORT_DISBURSEMENT.NOT_REPORT,
												text: 'Chưa báo cáo',
												textColor: '#FFFFFF',
												backgroundColor: '#FF852C',
											},
										]}
									/>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IReportDisbursement) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.state == STATE_REPORT_DISBURSEMENT.REJECTED ||
										data?.state == STATE_REPORT_DISBURSEMENT.NOT_REPORT ? (
											<>
												<IconCustom
													color='#16C1F3'
													type='edit'
													icon={<DocumentForward fontSize={20} fontWeight={600} />}
													tooltip='Gửi báo cáo'
													onClick={() => setUuidSendReport(data.uuid)}
												/>
												<IconCustom
													color='#005994'
													type='edit'
													icon={<Edit fontSize={20} fontWeight={600} />}
													tooltip='Chỉnh sửa'
													href={`${PATH.ReportDisbursementUpdate}?_uuid=${data?.uuid}`}
												/>
											</>
										) : null}
										<IconCustom
											color='#202939'
											href={`${PATH.ReportDisbursement}/${data?.uuid}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
										{data?.state == STATE_REPORT_DISBURSEMENT.NOT_REPORT ? (
											<IconCustom
												type='delete'
												icon={<Trash fontSize={20} fontWeight={600} />}
												tooltip='Xóa bỏ'
												onClick={() => {
													setOpenDelete(data);
												}}
											/>
										) : null}
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listUserContractFundAll?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='primary'
				open={!!uuidSendReport}
				icon={icons.question_1}
				onClose={() => setUuidSendReport('')}
				title={'Gửi báo cáo'}
				note={'Bạn có chắc chắn muốn xác nhận gửi báo cáo này không?'}
				onSubmit={funcSendReport.mutate}
			/>
			<Dialog
				type='error'
				open={!!openDelete}
				onClose={() => setOpenDelete(null)}
				title={'Xác nhận xóa'}
				note={'Bạn có chắc chắn muốn xóa báo cáo này?'}
				onSubmit={funcDeleteContratsFund.mutate}
			/>
		</div>
	);
}

export default MainPageReportDisbursement;
