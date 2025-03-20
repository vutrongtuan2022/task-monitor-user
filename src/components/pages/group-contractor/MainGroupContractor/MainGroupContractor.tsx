import React, {useState} from 'react';
import Tippy from '@tippyjs/react';

import {IGroupContractor, PropsMainGroupContractor} from './interfaces';
import styles from './MainGroupContractor.module.scss';
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
import PositionContainer from '~/components/common/PositionContainer';
import CreateGroupContractor from '../CreateGroupContractor';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import Dialog from '~/components/common/Dialog';
import UpdateGroupContractor from '../UpdateGroupContractor';

function MainGroupContractor({}: PropsMainGroupContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, action, _uuidGroupContractor} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');

	const listContractorCat = useQuery([QUERY_KEY.table_group_contractor, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.getListContractorCat({
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

	const funcDeleteGroupContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa nhóm nhà thầu thành công!',
				http: contractorcatServices.updateStatusContractorCat({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_group_contractor]);
			}
		},
	});

	const handleDeleteGroupContractor = () => {
		if (!uuidDelete) {
			return toastWarn({msg: 'Không tìm thấy nhóm nhà thầu!'});
		}

		return funcDeleteGroupContractor.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteGroupContractor.isLoading} />
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã, tên nhóm nhà thầu' />
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
						Thêm mới nhóm nhà thầu
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractorCat?.data?.items || []}
					loading={listContractorCat.isLoading}
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
									Thêm mới nhóm nhà thầu
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listContractorCat?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IGroupContractor, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã nhóm nhà thầu',
								render: (data: IGroupContractor) => <>{data?.code}</>,
							},
							{
								title: 'Tên nhóm nhà thầu',
								render: (data: IGroupContractor) => <>{data?.name}</>,
							},
							{
								title: 'Mô tả',
								render: (data: IGroupContractor) => (
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
								render: (data: IGroupContractor) => (
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
														_uuidGroupContractor: data?.uuid,
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
					total={listContractorCat?.data?.pagination?.totalCount}
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
				<CreateGroupContractor
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
				open={!!_uuidGroupContractor}
				onClose={() => {
					const {_uuidGroupContractor, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<UpdateGroupContractor
					onClose={() => {
						const {_uuidGroupContractor, ...rest} = router.query;

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
				title={'Xác nhận xóa'}
				note={'Bạn có chắc chắn muốn xóa nhóm nhà thầu này?'}
				onSubmit={handleDeleteGroupContractor}
			/>
		</div>
	);
}

export default MainGroupContractor;
