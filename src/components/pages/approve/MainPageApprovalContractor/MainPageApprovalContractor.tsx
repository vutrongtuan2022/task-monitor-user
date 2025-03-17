import React, {useState} from 'react';
import styles from './MainPageApprovalContractor.module.scss';
import {ITablePageApproveRequester, PropsMainPageApprovalContractor} from './interface';
import Breadcrumb from '~/components/common/Breadcrumb';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATE_APPROVED, STATE_REPORT_DISBURSEMENT, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import contractorcatServices from '~/services/contractorcatServices';
import Loading from '~/components/common/Loading';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import IconCustom from '~/components/common/IconCustom';
import {CloseCircle, TickCircle} from 'iconsax-react';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Tippy from '@tippyjs/react';
function MainPageApprovalContractor({}: PropsMainPageApprovalContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _contractorCat, _type, _state} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [form, setForm] = useState<{feedback: string}>({
		feedback: '',
	});

	const {data: getListRequesterContractor, isLoading} = useQuery(
		[QUERY_KEY.table_requester_contractor, _page, _pageSize, _keyword, _contractorCat],
		{
			queryFn: () =>
				httpRequest({
					http: contractorServices.getListRequesterContractor({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						status: STATUS_CONFIG.ACTIVE,
						keyword: _keyword as string,
						type: (_type as string) || '',
						state: [STATE_APPROVED.NOT_REPORTED],
						// state: !!_state ? Number(_state) : null,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcConfirm = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Duyệt nhà thầu mới thành công!',
				http: contractorServices.approveRequesterAddContractor({
					uuid: uuidConfirm,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidConfirm('');
				queryClient.invalidateQueries([QUERY_KEY.table_requester_contractor]);
			}
		},
	});

	const funcCancel = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Từ chối nhà thầu mới thành công!',
				http: contractorServices.rejectRequesterAddContractor({
					uuid: uuidCancel,
					// rejected: form?.feedback,
					reason: '',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidCancel('');
				queryClient.invalidateQueries([QUERY_KEY.table_requester_contractor]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<LayoutPages
				listPages={[
					{
						title: 'Duyệt nhóm nhà thầu',
						path: PATH.ContractorApproval,
					},
					{
						title: 'Duyệt nhà thầu mới ',
						path: PATH.ApprovalContractor,
					},
				]}
			>
				<Loading loading={funcConfirm.isLoading || funcCancel.isLoading} />
				<div className={styles.head}>
					<div className={styles.search_fillter}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Nhóm nhà thầu'
								query='_contractorCat'
								listFilter={listGroupContractor?.map((v: any) => ({
									id: v?.uuid,
									name: v?.name,
								}))}
							/>
						</div>
					</div>
				</div>
				<WrapperScrollbar>
					<DataWrapper data={getListRequesterContractor?.items || []} loading={isLoading}>
						<Table
							fixedHeader={true}
							data={getListRequesterContractor?.items || []}
							column={[
								{
									title: 'STT',
									fixedLeft: true,
									render: (data: ITablePageApproveRequester, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên nhà thầu',
									render: (data: ITablePageApproveRequester) => <>{data?.name || '---'}</>,
								},
								{
									title: 'Mã số thuế',
									render: (data: ITablePageApproveRequester) => <>{data?.code || '---'}</>,
								},
								{
									title: 'Nhóm nhà thầu',
									render: (data: ITablePageApproveRequester) => (
										<>
											{data?.contractorCatPending?.[0]?.name}
											{data?.contractorCatPending?.length > 1 && (
												<Tippy
													content={
														<ol style={{paddingLeft: '16px'}}>
															{data.contractorCatPending.slice(1).map((v, i) => (
																<li key={i}>{v?.name}</li>
															))}
														</ol>
													}
												>
													<span className={styles.link}>
														{' '}
														và {data.contractorCatPending.length - 1} nhóm khác
													</span>
												</Tippy>
											)}
										</>
									),
								},
								{
									title: 'Người gửi yêu cầu',
									render: (data: ITablePageApproveRequester) => <>{data?.requester?.fullname || '---'}</>,
								},
								{
									title: 'Hành động',
									fixedRight: true,
									render: (data: ITablePageApproveRequester) => (
										<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
											<>
												<IconCustom
													color='#06D7A0'
													icon={<TickCircle fontSize={20} fontWeight={600} />}
													tooltip='Duyệt nhà thầu mới'
													onClick={() => setUuidConfirm(data?.uuid)}
												/>
												<IconCustom
													color='#EE464C'
													icon={<CloseCircle fontSize={20} fontWeight={600} />}
													tooltip='Từ chối nhà thầu'
													onClick={() => setUuidCancel(data?.uuid)}
												/>
											</>
										</div>
									),
								},
							]}
						/>
					</DataWrapper>
					<Pagination
						currentPage={Number(_page) || 1}
						pageSize={Number(_pageSize) || 10}
						total={getListRequesterContractor?.pagination?.totalCount}
						dependencies={[_pageSize, _keyword, _contractorCat]}
					/>
				</WrapperScrollbar>
				<Dialog
					type='primary'
					open={!!uuidConfirm}
					icon={icons.success}
					onClose={() => setUuidConfirm('')}
					title={'Duyệt nhà thầu mới'}
					note={'Bạn có chắc chắn muốn duyệt nhà thầu mới này không?'}
					onSubmit={funcConfirm.mutate}
				/>

				<Dialog
					type='error'
					open={!!uuidCancel}
					icon={icons.question}
					onClose={() => setUuidCancel('')}
					title={'Từ chối nhà thầu mới'}
					note={'Bạn có chắc chắn muốn từ chối nhà thầu này không?'}
					onSubmit={funcCancel.mutate}
				/>
			</LayoutPages>
		</div>
	);
}

export default MainPageApprovalContractor;
