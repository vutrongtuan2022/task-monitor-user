import React, {useState} from 'react';

import {IDetailContractFund, IContractFund, PropsDetailReportDisbursement} from './interfaces';
import styles from './DetailReportDisbursement.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import Moment from 'react-moment';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_REPORT_DISBURSEMENT, STATUS_CONFIG} from '~/constants/config/enum';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import {convertCoin} from '~/common/funcs/convertCoin';
import icons from '~/constants/images/icons';
import Button from '~/components/common/Button';
import {DocumentForward} from 'iconsax-react';
import contractsFundServices from '~/services/contractFundServices';
import clsx from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import Tippy from '@tippyjs/react';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Link from 'next/link';
import Dialog from '~/components/common/Dialog';

function DetailReportDisbursement({}: PropsDetailReportDisbursement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _page, _pageSize} = router.query;

	const [openSendReport, setOpenSendReport] = useState<boolean>(false);

	const {data: detailContractFund} = useQuery<IDetailContractFund>([QUERY_KEY.detail_report_disbursement, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.detailContractFund({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const {data: listContractFund} = useQuery([QUERY_KEY.table_contract_report_disbursement, _page, _pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.detailContractFundFundPaged({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcSendReport = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Gửi báo cáo thành công!',
				http: contractsFundServices.sendContractFund({
					uuid: detailContractFund?.uuid!,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setOpenSendReport(false);
				queryClient.invalidateQueries([QUERY_KEY.detail_report_disbursement]);
				queryClient.invalidateQueries([QUERY_KEY.table_contract_report_disbursement]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportDisbursement,
						title: 'Danh sách báo cáo giải ngân',
					},
					{
						path: '',
						title: 'Chi tiết báo cáo',
					},
				]}
				action={
					<div className={styles.group_button}>
						{(detailContractFund?.state == STATE_REPORT_DISBURSEMENT.REJECTED ||
							detailContractFund?.state == STATE_REPORT_DISBURSEMENT.NOT_REPORT) && (
							<>
								<Button
									p_14_24
									rounded_8
									blueLinear
									icon={<DocumentForward size={18} color='#fff' />}
									onClick={() => setOpenSendReport(true)}
								>
									Gửi báo cáo
								</Button>
								<Button
									p_14_24
									rounded_8
									primaryLinear
									href={`${PATH.ReportDisbursementUpdate}?_uuid=${detailContractFund?.uuid}`}
								>
									Chỉnh sửa
								</Button>
							</>
						)}
					</div>
				}
			/>

			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái giải ngân:</p>
							<StateActive
								stateActive={detailContractFund?.state!}
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
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailContractFund?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Báo cáo tháng</p>
								<p>{`Tháng ${detailContractFund?.releasedMonth} - ${detailContractFund?.releasedYear}`}</p>
							</div>
							<div className={styles.item}>
								<p>Chi nhánh</p>
								<p>
									<span>{detailContractFund?.project?.branch?.code || '---'}</span> -
									<span style={{marginLeft: '4px'}}>{detailContractFund?.project?.branch?.name || '---'}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Số hợp đồng giải ngân</p>
								<p>{detailContractFund?.contractCount || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tổng số tiền giải ngân (VND)</p>
								<p>{convertCoin(detailContractFund?.totalAmount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Người báo cáo</p>
								<p>{detailContractFund?.creator?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày gửi báo cáo</p>
								<p>
									{detailContractFund?.sendDate ? (
										<Moment date={detailContractFund?.sendDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>

							{detailContractFund?.state === STATE_REPORT_DISBURSEMENT.REJECTED && (
								<div className={styles.item}>
									<p>Lý do từ chối báo cáo giải ngân</p>
									<p>{detailContractFund?.rejectedReason || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Danh sách giải ngân</h4>
					</div>
					<WrapperScrollbar>
						<DataWrapper
							data={listContractFund?.items || []}
							loading={listContractFund?.isLoading}
							noti={<Noti title='Danh sách hợp đồng trống!' des='Hiện tại chưa có hợp đồng nào!' />}
						>
							<Table
								fixedHeader={true}
								data={listContractFund?.items || []}
								column={[
									{
										title: 'STT',
										render: (data: IContractFund, index: number) => <>{index + 1}</>,
									},
									{
										title: 'Số hợp đồng',
										fixedLeft: true,
										render: (data: IContractFund) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link href={`${PATH.ContractReportDisbursement}/${data?.uuid}`} className={styles.link}>
													{data?.code}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Tên công việc',
										render: (data: IContractFund) => <>{data?.activity?.name}</>,
									},
									{
										title: 'Vốn dự phòng (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.reverseAmount)}</>,
									},
									{
										title: 'Vốn dự án (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.projectAmount)}</>,
									},

									{
										title: 'Ngày giải ngân',
										render: (data: IContractFund) => (
											<>{data?.releaseDate ? <Moment date={data?.releaseDate} format='DD/MM/YYYY' /> : '---'}</>
										),
									},
									{
										title: 'Số nhóm nhà thầu',
										render: (data: IContractFund) => (
											<>
												{data?.contractorInfos?.length && (
													<Tippy
														content={
															<ol style={{paddingLeft: '16px'}}>
																{[...new Set(data?.contractorInfos?.map((v) => v.contractorCatName))].map(
																	(catName, i) => (
																		<li key={i}>{catName}</li>
																	)
																)}
															</ol>
														}
													>
														<span style={{color: '#2970FF'}}>
															{[...new Set(data?.contractorInfos?.map((v) => v.contractorCatName))]?.length ||
																'---'}
														</span>
													</Tippy>
												)}
											</>
										),
									},
									{
										title: 'Số nhà thầu',
										render: (data: IContractFund) => (
											<>
												{data?.contractorInfos?.length && (
													<Tippy
														content={
															<ol style={{paddingLeft: '16px'}}>
																{[...new Set(data?.contractorInfos?.map((v) => v.contractorName))].map(
																	(catName, i) => (
																		<li key={i}>{catName}</li>
																	)
																)}
															</ol>
														}
													>
														<span style={{color: '#2970FF'}}>
															{[...new Set(data?.contractorInfos?.map((v) => v.contractorName))]?.length ||
																'---'}
														</span>
													</Tippy>
												)}
											</>
										),
									},
									{
										title: 'Mô tả',
										render: (data: IContractFund) => (
											<>
												{(data?.note && (
													<Tippy content={data?.note}>
														<p className={styles.name}>{data?.note || '---'}</p>
													</Tippy>
												)) ||
													'---'}
											</>
										),
									},
								]}
							/>
						</DataWrapper>
						<Pagination
							currentPage={Number(_page) || 1}
							pageSize={Number(_pageSize) || 10}
							total={listContractFund?.pagination?.totalCount}
							dependencies={[_pageSize, _uuid]}
						/>
					</WrapperScrollbar>
				</div>
			</div>

			<Dialog
				type='primary'
				open={openSendReport}
				icon={icons.question_1}
				onClose={() => setOpenSendReport(false)}
				title={'Gửi báo cáo'}
				note={'Bạn có chắc chắn muốn xác nhận gửi báo cáo này không?'}
				onSubmit={funcSendReport.mutate}
			/>
		</div>
	);
}

export default DetailReportDisbursement;
