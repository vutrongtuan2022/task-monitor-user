import React, {useState} from 'react';

import {IContractFund, PropsTableContractFund} from './interfaces';
import styles from './TableContractFund.module.scss';
import Moment from 'react-moment';
import {QUERY_KEY, STATE_REPORT_DISBURSEMENT, STATUS_CONFIG} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import {convertCoin} from '~/common/funcs/convertCoin';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {Eye} from 'iconsax-react';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import IconCustom from '~/components/common/IconCustom';
import contractorServices from '~/services/contractorServices';
import StateActive from '~/components/common/StateActive';
import PositionContainer from '~/components/common/PositionContainer';
import DetailContractFund from '../DetailContractFund';
function TableContractFund({}: PropsTableContractFund) {
	const router = useRouter();

	const {_uuid, _page, _pageSize} = router.query;
	const [uuidContractFund, setUuidContractFund] = useState<{
		uuid: string;
		releasedMonthYear: string;
	} | null>(null);
	const {data: listContractFund} = useQuery([QUERY_KEY.table_contract_fund_by_contractor, _page, _pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.getPagedContractFundByContractor({
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

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.basic_info}>
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
										title: 'Báo cáo tháng',
										render: (data: IContractFund) => (
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
										title: 'Tên dự án',
										render: (data: IContractFund) => <>{data?.project.name || '---'}</>,
									},

									{
										title: 'Tổng giá trị giải ngân (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.totalAmount) || '---'}</>,
									},
									{
										title: 'Sử dụng vốn dự phòng (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.reverseAmount) || '---'}</>,
									},
									{
										title: 'Sử dụng vốn dự án (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.projectAmount) || '---'}</>,
									},

									{
										title: 'Thời gian tạo',
										render: (data: IContractFund) => (
											<p>{data?.created ? <Moment date={data?.created} format='DD/MM/YYYY' /> : '---'}</p>
										),
									},
									{
										title: 'Trạng thái',
										render: (data: IContractFund) => (
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
										title: 'Tác vụ',
										fixedRight: true,
										render: (data: IContractFund) => (
											<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
												<IconCustom
													type='edit'
													icon={<Eye fontSize={20} fontWeight={600} />}
													tooltip='Xem chi tiết'
													// onClick={() => {
													// 	router.replace({
													// 		pathname: router.pathname,
													// 		query: {
													// 			...router.query,
													// 			_uuidContractFund: data?.uuid,
													// 		},
													// 	});
													// }}
													onClick={() =>
														setUuidContractFund({
															releasedMonthYear:
																data?.releasedMonth && data?.releasedYear
																	? `tháng ${data.releasedMonth}/${data.releasedYear}`
																	: data?.releasedYear
																	? `năm ${data.releasedYear}`
																	: '',

															uuid: data?.uuid || '',
														})
													}
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
							total={listContractFund?.pagination?.totalCount}
							dependencies={[_pageSize, _uuid]}
						/>
					</WrapperScrollbar>
					<PositionContainer open={!!uuidContractFund} onClose={() => setUuidContractFund(null)}>
						<DetailContractFund onClose={() => setUuidContractFund(null)} userContractFund={uuidContractFund!} />
					</PositionContainer>
				</div>
			</div>
		</div>
	);
}

export default TableContractFund;
