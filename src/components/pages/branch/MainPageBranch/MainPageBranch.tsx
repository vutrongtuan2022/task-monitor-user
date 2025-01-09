import React, {useState} from 'react';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';

import {IBranches, PropsMainPageBranch} from './interfaces';
import styles from './MainPageBranch.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {Edit, Trash} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import branchesServices from '~/services/branchesServices';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import Dialog from '~/components/common/Dialog';
import PositionContainer from '~/components/common/PositionContainer';
import CreateBranch from '../CreateBranch';
import UpdateBranch from '../UpdateBranch';

function MainPageBranch({}: PropsMainPageBranch) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, action, _uuidBranches} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');

	const listBranches = useQuery([QUERY_KEY.table_branches, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: branchesServices.getListBranches({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDeleteBranches = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa chi nhánh thành công!',
				http: branchesServices.updateStatusBranches({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_branches]);
			}
		},
	});

	const handleDeleteBranches = () => {
		if (!uuidDelete) {
			return toastWarn({msg: 'Không tìm thấy chi nhánh!'});
		}

		return funcDeleteBranches.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteBranches.isLoading} />
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã, tên chi nhánh' />
					</div>
				</div>

				<div className={styles.btn}>
					<Button
						p_14_24
						rounded_8
						light-blue
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									action: 'create',
								},
							});
						}}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm chi nhánh
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listBranches?.data?.items || []}
					loading={listBranches.isLoading}
					noti={
						<Noti
							button={
								<Button
									p_14_24
									rounded_8
									light-blue
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												action: 'create',
											},
										});
									}}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm chi nhánh
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listBranches?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IBranches, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã chi nhánh',
								render: (data: IBranches) => <>{data?.code}</>,
							},
							{
								title: 'Tên chi nhánh',
								render: (data: IBranches) => <>{data?.name}</>,
							},
							{
								title: 'Địa chỉ',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Mô tả',
								render: (data: IBranches) => (
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
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IBranches) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											type='edit'
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											onClick={() => {
												router.replace({
													pathname: router.pathname,
													query: {
														...router.query,
														_uuidBranches: data?.uuid,
													},
												});
											}}
										/>

										<IconCustom
											type='delete'
											icon={<Trash fontSize={20} fontWeight={600} />}
											tooltip='Xóa bỏ'
											onClick={() => setUuidDelete(data?.uuid)}
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
					total={listBranches?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
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
				<CreateBranch
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

			<PositionContainer
				open={!!_uuidBranches}
				onClose={() => {
					const {_uuidBranches, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<UpdateBranch
					onClose={() => {
						const {_uuidBranches, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<Dialog
				open={!!uuidDelete}
				onClose={() => setUuidDelete('')}
				type='error'
				title={'Xóa chi nhánh'}
				note={'Bạn có chắc chắn muốn xóa chi nhánh này?'}
				onSubmit={handleDeleteBranches}
			/>
		</div>
	);
}

export default MainPageBranch;
