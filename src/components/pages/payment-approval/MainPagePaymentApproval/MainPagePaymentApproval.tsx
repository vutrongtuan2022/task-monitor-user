import React, {useState} from 'react';

import {IPayment, PropsMainPagePaymentApproval} from './interfaces';
import styles from './MainPagePaymentApproval.module.scss';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {Edit} from 'iconsax-react';
import FilterCustom from '~/components/common/FilterCustom';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_APPROVED, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import contractorcatServices from '~/services/contractorcatServices';
import PositionContainer from '~/components/common/PositionContainer';
// import UpdateContractor from '../UpdateContractor';
import Tippy from '@tippyjs/react';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import CreatePayment from '../CreatePayment';

function MainPagePaymentApproval({}: PropsMainPagePaymentApproval) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, action, _type, _uuidContractor} = router.query;

	const listContractor = useQuery([QUERY_KEY.table_list_contractor, _page, _pageSize, _keyword, _type], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.listContractor({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					type: (_type as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: [STATE_APPROVED.NOT_REPORTED, STATE_APPROVED.APPROVED],
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listGroupContractor = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: '',
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
							name='Nhóm nhà thầu'
							query='_type'
							listFilter={listGroupContractor.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
				</div>
				<div className={styles.btn}>
					<Button
						p_14_24
						rounded_8
						light-blue
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									action: 'create',
								},
							});
						}}
					>
						Thêm mới cấp số
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper data={listContractor?.data?.items || []} loading={listContractor.isLoading} noti={<Noti />}>
					<Table
						fixedHeader={true}
						data={listContractor?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IPayment, index: number) => (
									<p
										style={{
											color:
												data?.contractorCat?.length === 0 ? '#EE464C' : data?.contractorCat?.length >= 1 ? '' : '',
										}}
									>
										{index + 1}
									</p>
								),
							},
							{
								title: 'Tên nhà thầu',
								render: (data: IPayment) => (
									<p
										style={{
											color:
												data?.contractorCat?.length === 0 ? '#EE464C' : data?.contractorCat?.length >= 1 ? '' : '',
										}}
									>
										{data?.name}
									</p>
								),
							},
							{
								title: 'Nhóm nhà thầu',
								render: (data: IPayment) => (
									<p
										style={{
											color:
												data?.contractorCat?.length === 0 ? '#EE464C' : data?.contractorCat?.length >= 1 ? '' : '',
										}}
									>
										{data?.contractorCat?.length === 0 ? (
											<>
												<>{data?.contractorCatPending?.[0]?.name}</>
												{data?.contractorCatPending?.length > 1 && (
													<Tippy
														content={
															<ol style={{paddingLeft: '16px'}}>
																{data?.contractorCatPending?.slice(1).map((v, i) => (
																	<li key={i}>{v?.name}</li>
																))}
															</ol>
														}
													>
														<span style={{color: '#EE464C'}} className={styles.link}>
															{' '}
															và {data.contractorCatPending.length - 1} nhóm chờ duyệt khác
														</span>
													</Tippy>
												)}
											</>
										) : (
											<>
												{data?.contractorCat?.[0]?.name}
												{data?.contractorCat?.length > 1 && (
													<Tippy
														content={
															<ol style={{paddingLeft: '16px'}}>
																{data?.contractorCat?.slice(1).map((v, i) => (
																	<li key={i}>{v?.name}</li>
																))}
															</ol>
														}
													>
														<span className={styles.link}> và {data.contractorCat.length - 1} nhóm khác</span>
													</Tippy>
												)}
												{data?.contractorCatPending?.length! > 0 && (
													<Tippy
														content={
															<ol style={{paddingLeft: '16px'}}>
																{[...data?.contractorCatPending!]?.map((v, i) => (
																	<li key={i}>{v?.name}</li>
																))}
															</ol>
														}
													>
														<span style={{color: '#EE464C'}} className={styles.link}>
															{' '}
															và {data?.contractorCatPending?.length!} nhóm chờ duyệt
														</span>
													</Tippy>
												)}
											</>
										)}
									</p>
								),
							},
							{
								title: 'Địa chỉ',
								render: (data: IPayment) => (
									<p
										style={{
											color:
												data?.contractorCat?.length === 0 ? '#EE464C' : data?.contractorCat?.length >= 1 ? '' : '',
										}}
									>
										{data?.address || '---'}
									</p>
								),
							},
							{
								title: 'Mô tả',
								render: (data: IPayment) => (
									<p
										style={{
											color:
												data?.contractorCat?.length === 0 ? '#EE464C' : data?.contractorCat?.length >= 1 ? '' : '',
										}}
									>
										{(data?.note && (
											<Tippy content={data?.note}>
												<p className={styles.name}>{data?.note || '---'}</p>
											</Tippy>
										)) ||
											'---'}
									</p>
								),
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IPayment) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											type='edit'
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Bổ sung nhóm nhà thầu'
											disnable={
												data?.state === STATE_APPROVED.REJECTED || data?.state === STATE_APPROVED.NOT_REPORTED
											}
											onClick={() => {
												router.replace({
													pathname: router.pathname,
													query: {
														...router.query,
														_uuidContractor: data?.uuid,
													},
												});
											}}
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
					total={listContractor?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _type]}
				/>
			</WrapperScrollbar>

			<PositionContainer
				open={action == 'create'}
				onClose={() => {
					const {action, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<CreatePayment
					onClose={() => {
						const {action, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			{/* <PositionContainer
				open={!!_uuidContractor}
				onClose={() => {
					const {_uuidContractor, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<UpdateContractor
					onClose={() => {
						const {_uuidContractor, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer> */}
		</div>
	);
}

export default MainPagePaymentApproval;
