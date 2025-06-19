import React from 'react';

import {IContractFund, PropsTableContractFund} from './interfaces';
import styles from './TableContractFund.module.scss';
import Moment from 'react-moment';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import {convertCoin} from '~/common/funcs/convertCoin';
import contractsFundServices from '~/services/contractFundServices';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import Tippy from '@tippyjs/react';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Link from 'next/link';

function TableContractFund({}: PropsTableContractFund) {
	const router = useRouter();

	const {_uuid, _page, _pageSize} = router.query;

	const {data: listContractFund} = useQuery([QUERY_KEY.table_contract_fund_by_contractor, _page, _pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.contractFundByContractor({
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
										title: 'Số hợp đồng',
										fixedLeft: true,
										render: (data: IContractFund) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link
													href={`${PATH.ContractReportDisbursement}/${data?.uuid}?_uuidContract=${_uuid}`}
													className={styles.link}
												>
													{data?.code}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Tên dự án',
										render: (data: IContractFund) => (
											<>{data?.pnContract?.pn?.project?.name || data?.activity?.project?.name}</>
										),
									},
									{
										title: 'Tên công việc',
										render: (data: IContractFund) => <>{data?.activity?.name}</>,
									},
									{
										title: 'Sử dụng vốn dự phòng (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.reverseAmount)}</>,
									},
									{
										title: 'Sử dụng vốn dự án (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.projectAmount)}</>,
									},
									{
										title: 'Ngày giải ngân',
										render: (data: IContractFund) => (
											<>{data?.releaseDate ? <Moment date={data?.releaseDate} format='DD/MM/YYYY' /> : '---'}</>
										),
									},
									{
										title: 'Số thông báo chấp thuận thanh toán',
										render: (data: IContractFund) => <>{data?.pnContract?.pn?.code || '---'}</>,
									},
									{
										title: 'Ngày chấp nhận thanh toán',
										render: (data: IContractFund) => (
											<>
												{data?.pnContract ? (
													<Moment date={data?.pnContract?.pn?.numberingDate} format='DD/MM/YYYY' />
												) : (
													'---'
												)}
											</>
										),
									},
									{
										title: 'Giá trị chấp nhận thanh toán (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.pnContract?.amount) || '---'}</>,
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
		</div>
	);
}

export default TableContractFund;
