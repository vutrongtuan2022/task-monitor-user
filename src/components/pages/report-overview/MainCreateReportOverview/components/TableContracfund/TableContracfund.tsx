import React, {useContext, useState} from 'react';
import styles from './TableContracfund.module.scss';
import {IContractFund, PropsTableContracFund} from './interface';
import clsx from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';
import Pagination from '~/components/common/Pagination';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import contractsFundServices from '~/services/contractFundServices';
import {CreateReportOverview, ICreateReportOverview} from '../../context';

function TableContracfund({}: PropsTableContracFund) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);

	const {year, month, projectUuid} = useContext<ICreateReportOverview>(CreateReportOverview);

	const {data: listContractFundForOverView, isLoading} = useQuery(
		[QUERY_KEY.table_contract_fund_for_overview, projectUuid, month, year, page, pageSize],
		{
			queryFn: () =>
				httpRequest({
					http: contractsFundServices.listContractFundForOverView({
						page: Number(page) || 1,
						pageSize: Number(pageSize) || 10,
						projectUuid: projectUuid,
						year: year!,
						month: month!,
					}),
				}),
			select(data) {
				return data;
			},
			enabled: !!year && !!month && !!projectUuid,
		}
	);
	return (
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách giải ngân</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractFundForOverView?.items || []}
					loading={isLoading}
					noti={<Noti title='Danh sách hợp đồng trống!' des='Hiện tại chưa có hợp đồng nào!' />}
				>
					<Table
						fixedHeader={true}
						data={listContractFundForOverView?.items || []}
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
											href={`${PATH.ContractReportDisbursement}/${data?.activity?.contracts?.uuid}`}
											className={styles.link}
										>
											{data?.activity?.contracts?.code}
										</Link>
									</Tippy>
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
								render: (data: IContractFund) => <>{convertCoin(data?.amount)}</>,
							},
							{
								title: 'Ngày giải ngân',
								render: (data: IContractFund) => (
									<>{data?.releaseDate ? <Moment date={data?.releaseDate} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Ngày gửi báo cáo',
								render: (data: IContractFund) => (
									<>{data?.sendDate ? <Moment date={data?.sendDate} format='DD/MM/YYYY' /> : '---'}</>
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
												<span className={styles.link_contractor}>
													{[...new Set(data?.contractorInfos?.map((v) => v.contractorCatName))]?.length || '---'}
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
												<span className={styles.link_contractor}>
													{[...new Set(data?.contractorInfos?.map((v) => v.contractorName))]?.length || '---'}
												</span>
											</Tippy>
										)}
									</>
								),
								// <>{data?.contractor?.name}</>
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
					currentPage={page}
					pageSize={pageSize}
					onSetPage={setPage}
					onSetpageSize={setPageSize}
					total={listContractFundForOverView?.pagination?.totalCount}
					dependencies={[projectUuid, month, year, pageSize]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default TableContracfund;
