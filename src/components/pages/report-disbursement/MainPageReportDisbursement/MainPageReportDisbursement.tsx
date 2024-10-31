import React, {useState} from 'react';

import {IProjectFundAll, PropsMainPageReportDisbursement} from './interfaces';
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
import {DocumentForward, Edit, Eye} from 'iconsax-react';
import Moment from 'react-moment';
import Progress from '~/components/common/Progress';
import {convertCoin} from '~/common/funcs/convertCoin';
import projectFundServices from '~/services/projectFundServices';
import {generateYearsArray} from '~/common/funcs/selectDate';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';

function MainPageReportDisbursement({}: PropsMainPageReportDisbursement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _approved} = router.query;

	const [uuidSendBack, setUuidSendBack] = useState<string>('');

	const listProjectFundAll = useQuery([QUERY_KEY.table_list_report_disbursement, _page, _pageSize, _keyword, _approved, _year, _month], {
		queryFn: () =>
			httpRequest({
				http: projectFundServices.listProjectFundAll({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					approved: !!_approved ? Number(_approved) : null,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcSendBackReport = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Gửi lại báo cáo thành công!',
				http: projectFundServices.sendProjectFund({
					uuid: uuidSendBack,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidSendBack('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_report_disbursement]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcSendBackReport.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công trình' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_approved'
							listFilter={[
								{
									id: STATE_REPORT_DISBURSEMENT.NOT_APPROVED,
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
			<WrapperScrollbar>
				<DataWrapper
					data={listProjectFundAll?.data?.items || []}
					loading={listProjectFundAll.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách báo cáo giải ngân trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listProjectFundAll?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IProjectFundAll, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên công trình',
								render: (data: IProjectFundAll) => <>{data?.project?.name}</>,
							},
							{
								title: 'Báo cáo tháng',
								render: (data: IProjectFundAll) => <>{data?.monthReport || '---'}</>,
							},
							{
								title: 'Tổng mức đầu tư (VND)',
								render: (data: IProjectFundAll) => <>{convertCoin(data?.totalInvest) || '---'}</>,
							},
							{
								title: 'Kế hoạch vốn theo năm (VND)',
								render: (data: IProjectFundAll) => <>{convertCoin(data?.annualBudget) || '---'}</>,
							},
							{
								title: 'Số tiền giải ngân (VND)',
								render: (data: IProjectFundAll) => <>{convertCoin(data?.realeaseBudget) || '---'}</>,
							},
							{
								title: 'Lũy kế toàn bộ dự án (VND)',
								render: (data: IProjectFundAll) => <>{convertCoin(data?.projectAccumAmount) || '---'}</>,
							},
							{
								title: 'Lũy kế theo năm (VND)',
								render: (data: IProjectFundAll) => <>{convertCoin(data?.annualAccumAmount) || '---'}</>,
							},

							{
								title: 'Tỷ lệ giải ngân',
								render: (data: IProjectFundAll) => <Progress percent={data?.fundProgress} width={80} />,
							},
							{
								title: 'Ngày gửi báo cáo',
								render: (data: IProjectFundAll) => <Moment date={data?.created} format='DD/MM/YYYY' />,
							},
							{
								title: 'Trạng thái',
								render: (data: IProjectFundAll) => (
									<StateActive
										stateActive={data?.approved}
										listState={[
											{
												state: STATE_REPORT_DISBURSEMENT.REJECTED,
												text: 'Bị từ chối',
												textColor: '#FFFFFF',
												backgroundColor: '#F37277',
											},
											{
												state: STATE_REPORT_DISBURSEMENT.NOT_APPROVED,
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
										]}
									/>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IProjectFundAll) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data.approved == STATE_REPORT_DISBURSEMENT.REJECTED ? (
											<>
												{/* <IconCustom
													color='#FF852C'
													type='edit'
													icon={<DocumentForward fontSize={20} fontWeight={600} />}
													tooltip='Gửi lại'
													onClick={() => setUuidSendBack(data.uuid)}
												/> */}
												<IconCustom
													color='#16C1F3'
													type='edit'
													icon={<Edit fontSize={20} fontWeight={600} />}
													tooltip='Chỉnh sửa'
													href={`${PATH.ReportDisbursementUpdate}?_uuid=${data?.uuid}`}
												/>
											</>
										) : null}
										<IconCustom
											href={`${PATH.ReportDisbursement}/${data?.uuid}`}
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
					pageSize={Number(_pageSize) || 20}
					total={listProjectFundAll?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='primary'
				open={!!uuidSendBack}
				icon={icons.question_1}
				onClose={() => setUuidSendBack('')}
				title={'Gửi lại báo cáo'}
				note={'Bạn có chắc chắn muốn xác nhận gửi lại báo cáo này không?'}
				onSubmit={funcSendBackReport.mutate}
			/>
		</div>
	);
}

export default MainPageReportDisbursement;
